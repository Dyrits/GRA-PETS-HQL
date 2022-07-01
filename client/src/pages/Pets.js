import React, {useState} from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";
import {MutationTuple} from "@apollo/react-hooks/lib/types";

const PETS = gql`
  query Pets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const ADD_PET = gql`
  mutation AddPet($input: NewPetInput!) {
    addPet(input: $input) {
      id
      name
      type
      img
    }
  }
`;



export default function Pets () {
  const [modal, setModal] = useState(false);
  const queryResult = useQuery(PETS);
  const { pets } = queryResult.data;
  const [addPet, mutationResult] = useMutation(ADD_PET);

  const onSubmit = async input => {
    setModal(false);
    await addPet({ variables: {input} });
    await queryResult.refetch();
  }

  if (queryResult.loading || mutationResult.loading) { return <Loader />; }
  if (queryResult.error || mutationResult.error) { return <p>An error occurred!</p>; }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets} />
      </section>
    </div>
  );
}
