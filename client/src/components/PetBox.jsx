import React, {useState} from 'react'

const PetBox = ({pet}) => {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <div className="pet">
      <figure>
        {imageFailed ? <div className="pet-image-fallback" role="img" aria-label={`Photo unavailable for ${pet.name}`}>Photo unavailable</div> :
          <img src={pet.img + `?pet=${pet.id}`} alt={pet.name} onError={() => setImageFailed(true)} />}
      </figure>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-type">{pet.type}</div>
    </div>
  )
}

export default PetBox
