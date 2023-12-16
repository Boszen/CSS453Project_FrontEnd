import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosCentral from './axiosHandler';

let api_base_url 
let access_token 
let patch_note_json

const NoteAllAppPage = () => {
  const { appId } = useParams();
  const [appNote, setAppNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;

        const response = await axiosCentral.get(`${api_base_url}/api/app/getApp/${appId}`,{
          headers: {
            'ngrok-skip-browser-warning': 'asd'
          }
        });

        setAppNote(response.data.data);
        patch_note_json = JSON.parse(response.data.data.patch_note)
        console.log(patch_note_json)
      } catch (error) {
        console.error('Error fetching app details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  return (
    <div>
      <h2>All Supported App &gt; {appNote.name} </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Vendor</h3> 
          <div>Name: {patch_note_json.vendorNotes.vendorName}</div>
          <div>Email: {patch_note_json.vendorNotes.email}</div>
          <div>Phone: {patch_note_json.vendorNotes.phone}</div>
          <h3>Latest Version</h3> 
          <div>{patch_note_json.currentVersion}</div>
          <h3>Update Approach</h3> 
          <div>{patch_note_json.updateApproach}</div>
          <h3>Patch Note</h3> 
          <table>
          <thead>
            <tr>
              <th>Patch Version</th>
              <th>Date</th>
              <th>Fixes</th>
            </tr>
          </thead>
          <tbody>
            {patch_note_json.patches.map(patch => (
              <tr key={patch.version}>
                <td style={{width: '100px', textAlign: 'center'}}>{patch.version}</td>
                <td style={{width: '100px', textAlign: 'center'}}>{patch.date}</td>
                <td>
                  {
                    patch.fix.map(fix =>(
                      <div><h4> Issue ID.{fix.issueID} </h4>{fix.description}</div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default NoteAllAppPage;
