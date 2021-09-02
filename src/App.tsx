import {useEffect, useState} from 'react'
import './App.css';
import Table from './components/Table';

const App: React.FC=() => {

  const [ salesOrders, setSalesOrders] =useState<[]>([])

  const getOrders = async () =>{
    await fetch("./data/sales-orders.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setSalesOrders(json)
    });
  }
 
  useEffect(() => {
      getOrders()
  }, [])
  // console.log(data)


  // const 

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
