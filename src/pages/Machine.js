import {useParams} from "react-router";
import React from "react";

export default function Machine() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}