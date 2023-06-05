// ./components/BarChart.js

import { React, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// Database
import { db, auth } from '../../firebase-config';
import { getDatabase, ref, child, get } from "firebase/database";

const BarChart = () => {
  // FEATS
  const [intakePerDay, setIntakePerDay] = useState([]);
  const [Date, setDate] = useState([]);
  const dbRef = ref(db);

  useEffect(()=>{
    fetchData();
  },[])

  async function fetchData() {
    // Date
    for (let i = 0; i < 7; i++) {
      get(child(dbRef, `testing/Days/${i}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setDate((Date) => [...Date,snapshot.val().date]);
          setIntakePerDay((intakePerDay) => [...intakePerDay,snapshot.val().Intake]);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  const data = {
    labels: Date,
    datasets: [
      {
        label: "Your intake for the week",
        backgroundColor: "#146C94",
        borderColor: "rgb(255, 99, 132)",
        data: intakePerDay,
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
    
  );
};

export default BarChart;