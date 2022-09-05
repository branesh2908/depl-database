import { db } from "./firebase.config"
import { useState, useEffect } from "react"
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore"

function App() {
  const [employes, setemployes] = useState([])
  const [form, setForm] = useState({
    name: "",
    title: "",
    desc: "",
    secskill: "",
  })
  const [popupActive, setPopupActive] = useState(false)
 
  const employesCollectionRef = collection(db, "employes")

  useEffect(() => {
    onSnapshot(employesCollectionRef, snapshot => {
      setemployes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  },)

  
  // const [editing, setEditing] = useState(false);
  // const editRow = employe => {
  //   setEditing(true);
  //   setemployes({ title: employe.title, name: employe.name, desc: employe.desc });
  //   setPopupActive(true)
  // }; 
  
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    setIsActive(current => !current);
  };

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !form.title ||
      !form.desc ||
      !form.name ||
      !form.secskill
    ) {
      alert("Please fill out all fields")
      return
    }
    addDoc(employesCollectionRef, form)

    setForm({
      name: "",
      title: "",
      desc: "",
      secskill: "",
    })
    setPopupActive(false)
  }

  const removeemploye = id => {
    deleteDoc(doc(db, "employes", id))
  }

  return (
    <div className="App">
      <div className="nav-bar">
        <h1>Manage Employees</h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add Employee Data</button>
      </div>
      <table className="employes">
        <tr className="dashbrd">Dashboard</tr>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>primary skill set</th>
              <th>Secondary skill set</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            { employes.map((employe, index) => (
          <tbody className="employe" key={employe.id}>            
            <tr>
            <td>{index + 1}</td>
              <td>{ employe.name }</td>
              <td className={isActive ? 'complete' : ''}>{ employe.title }</td>
              <td dangerouslySetInnerHTML={{ __html: employe.desc }}></td>
              <td>{ employe.secskill }</td>
              {/* <td className="buttons"><button onClick={handleClick}>complete </button></td> */}
              <td><button className="edit glyphicon glyphicon-pencil">
                </button>
              <button className="trash glyphicon glyphicon-trash" onClick={() => removeemploye(employe.id)}>
                </button></td>
            </tr>
            </tbody>
        ))}
      </table>
      { popupActive && <div className="popup">
        <div className="popup-inner">
        <button type="button" class="remove glyphicon glyphicon-remove" onClick={() => setPopupActive(false)}>
        </button>
          <h2>Add employee data</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} />
            </div>            
            <div className="form-group">
              <label>primary skill set</label>
              <input 
                type="text" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>secondary skill set</label>
              <input 
                type="text" 
                value={form.secskill} 
                onChange={e => setForm({...form, secskill: e.target.value})} />
            </div>            
            <div className="form-group">
              <label>Address</label>
              <textarea 
                type="text" 
                value={form.desc} 
                onChange={e => setForm({...form, desc: e.target.value})} />
            </div>
            <div className="buttons">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>}
    </div>
  );
}
export default App;