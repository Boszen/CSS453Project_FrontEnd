import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import axiosCentral from './axiosHandler';
import './allApp.css'

let api_base_url 
let access_token 
let refresh_token 

const AllAppPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;

        await axiosCentral.get(`${api_base_url}/api/app/getAllApp`, {
          headers: {
            'ngrok-skip-browser-warning': 'asd'
          }
        }).then(response => {
          console.log(response.data)
          setItems(response.data.data);
        }).catch(err => {
          setItems([{
            DisplayName: 'Have not upload yet',
            DisplayVersion: 'Have not upload yet'
          }])
        })    

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[]);

  return (
    <div>
      <h2>All Supported App</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Latest Version</th>
              <th>Patch Note</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.app_id}>
                <td>{item.name}</td>
                <td>{item.latest_version}</td>
                <td style = {{ textAlign: 'center', paddingLeft: '0px' }}>
                  <NavLink to={`/noteAllApp/${item.app_id}`} className = 'noteAll' >
                    Note
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAppPage;