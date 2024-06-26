import React from "react";
import { useState, useEffect } from "react";
import FacultyPanel from "../FacultyPanel";
import logo from "../assetsFaculty/questprobelogo.svg";
import { CategorySelectUser } from "../../Services/UserService";
import axios from "axios";

const FacultyDashboard = () => {
 // Backend Connection Start
 const [user, setUser] = useState([]);
 const [student, setStudent] = useState(0);
 const [error, setError] = useState("");
 const [ques, setQues] = useState(0);
 const [quiz, setQuiz] = useState(0);
 const [tech, setTech] = useState([]);
 const [username, setUsername] = useState("");

 useEffect(() => {
  getalluser();
 }, []);

 const getalluser = async () => {
  let role = "student";
  CategorySelectUser(role)
   .then((response) => {
    setUser(response.data);
    setStudent(response.data.length);
    // console.log(response.data);
   })
   .catch((error) => console.log(error));
  try {
   const response = await axios.get(
    "http://localhost:8080/api/questions/getAllQuestion"
   );
   setQues(response.data.length);
   //    console.log("Questions" + response.data);
  } catch (error) {
   setError("Failed to fetch questions");
  }
  try {
   const response = await axios.get("http://localhost:8080/api/quizzes");
   setQuiz(response.data.length);
   //    console.log("Quizz" + response.data);
  } catch (error) {
   setError("Failed to fetch quizz");
  }
  try {
   const res = await axios.get("http://localhost:8080/api/quizzes");
   setTech(res.data.length);
  } catch (error) {
   setError("Failed to fetch user responses");
  }
 };
 const getcurrenttime = () => {
  var Time = new Date();
  return Time.getHours();
 };

 const getgreeting = () => {
  var time = getcurrenttime();
  var greeting = "";
  if (time > 4 && time < 12) greeting = "Morning";
  else if (time >= 12 && time < 16) greeting = "Afternoon";
  else if (time >= 16 && time < 20) greeting = "Evening";
  else greeting = "Night";

  return "Good " + greeting;
 };
 //  console.log(student);
 //  console.log(teacher);
 //  console.log(user);
 //  console.log(error);
 // Backend Connection End
 return (
  <FacultyPanel>
   {/* <!-- =========Start of Main========= --> */}
   <main>
    <h1>Dashboard</h1>
    <div className="welcome-logo-txt">
     <img src={logo} alt="error" />
     <h1>
      QUEST
      <span className="primary">PROBE</span>
     </h1>
    </div>
    <div className="insights">
     {/* <!-- =========Start of Total Quizzes Created========= --> */}
     <div className="total-quiz">
      <span className="material-icons">travel_explore</span>
      <div className="middle">
       <div className="left">
        <h3>Total Quizzes Created</h3>
        <h1>{quiz}</h1>
       </div>
      </div>
      <small className="text-muted">Last 24 Hours</small>
     </div>
     {/* <!-- =========End of Total Quizzes Created========= --> */}
     {/* <!-- =========Start of Total Questions Created========= --> */}
     <div className="total-questions">
      <span className="material-icons">quiz</span>
      <div className="middle">
       <div className="left">
        <h3>Total Questions Created</h3>
        <h1>{ques}</h1>
       </div>
      </div>
      <small className="text-muted">Last 24 Hours</small>
     </div>
     {/* <!-- =========End of Total Questions Created========= --> */}
     {/* <!-- =========Start of Total Technologies Created========= --> */}
     <div className="total-tech">
      <span className="material-icons">find_in_page</span>
      <div className="middle">
       <div className="left">
        <h3>Total Technologies Created</h3>
        <h1>{tech}</h1>
       </div>
      </div>
      <small className="text-muted">Last 24 Hours</small>
     </div>
     {/* <!-- =========End of Total Technologies Created========= --> */}
     {/* <!-- =========Start of Total Students Created========= --> */}
     <div className="total-facstu">
      <span className="material-icons">wc</span>
      <div className="middle">
       <div className="left">
        <h3>Total Students Connected</h3>
        <h1>{student}</h1>
       </div>
      </div>
      <small className="text-muted">Last 24 Hours</small>
     </div>
     {/* <!-- =========End of Total Students Created========= --> */}
    </div>
    {/* <!-- =========End of Insights========= --> */}
   </main>
   {/* <!-- =========End of Main========= --> */}
   <h6
    style={{
     textAlign: "center",
     marginTop: "5rem",
     color: "var(--color-dark)"
    }}
   >
    @Designed By Bhabani
   </h6>
  </FacultyPanel>
 );
};

export default FacultyDashboard;
