import { useEffect, useState } from "react";
import { CampList } from "../../UI/Camps/CampList";
import { getCamps } from "../../../api/camps";

export const CampsPage = () => {
  const [camps, setCamps] = useState([]);
  useEffect(() => {
    getCamps().then((result) => {
      setCamps(result);
    });
  }, []);

  return (
    <div>
      <CampList camps={camps} />
    </div>
  );
};
