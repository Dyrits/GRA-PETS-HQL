const assert=require('node:assert/strict');
const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {spawn}=require('node:child_process');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'gra-pets-test-'));const dbFile=path.join(dir,'db.json');fs.copyFileSync('api/src/db/db.json',dbFile);
 const port=14389;const server=spawn(process.execPath,['api/src/server.js'],{env:{...process.env,PORT:String(port),DB_FILE:dbFile},stdio:'ignore'});
 async function query(query){const r=await fetch(`http://127.0.0.1:${port}/`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query})});const j=await r.json();assert(!j.errors,JSON.stringify(j.errors));return j.data;}
 try{
 let ready=false;for(let i=0;i<60;i++){try{await query('{user{id}}');ready=true;break;}catch{await new Promise(r=>setTimeout(r,50));}}assert(ready,'server must start');
 const before=await query('{pets{id name type} user{id username}}');assert.equal(before.user.id,'1');assert.equal(before.pets.length,2);
 const added=await query('mutation{addPet(input:{name:"Integration pet",type:DOG}){id name type owner{id}}}');assert.equal(added.addPet.name,'Integration pet');assert.equal(added.addPet.owner.id,'1');
 const after=await query('{pets{name}}');assert(after.pets.some(x=>x.name==='Integration pet'));
 assert(JSON.parse(fs.readFileSync(dbFile)).pet.some(x=>x.name==='Integration pet'));
 console.log('PASS real GraphQL query, mutation, owner resolution and scratch-file persistence');
 }finally{server.kill();await new Promise(r=>server.once('exit',r));fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1});
