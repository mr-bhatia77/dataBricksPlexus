// src/pages/DataSet.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

interface DataSetItem {
  id: number;
  dataSourceIdentifier: string;
  dataSource: string;
  InputSourceARN: string;
  MatchRule: string;
  srcpatientidentifier: string;
  mrnsite: string;
  namedob: string;
  emailaddress: string;
  addressline: string;
  birthdate: string;
  city: string;
  homephone: string;
  mobilephone: string;
  mrn: string;
  namefamily: string;
  namegivenfirst: string;
  namegivenmiddle: string;
  postalcode: string;
  siteidentifier: string;
  srcgenderdesc: string;
  state: string;
  recordId: string;
  masterPatientIdentifier: string;
  matchingJobId: string;
  user_Input: boolean;
}

const DATASET_FETCH_URL = 'https://vivagoals-qa.analytics.crohnscolitisfoundation.org/vivagoals/show/Databricks/masterTable/Dataset2/fetchData';

const DataSet2: React.FC = () => {
  const [data, setData] = useState<DataSetItem[]>([]);

  useEffect(() => {
    axios.get<DataSetItem[]>(DATASET_FETCH_URL)
      .then(res => setData(res.data))
      .catch(() => alert('Something went wrong! Failed to fetch DataSet'));
  }, []);

  const handleUserInputChange = (
    masterPatientIdentifier: string,
    recordId: string,
    userInputValue: string
  ) => {
    const UPDATE_URL = 
      `https://vivagoals-qa.analytics.crohnscolitisfoundation.org/vivagoals/update/DatabricksData/` +
      `userInput/${userInputValue}/` +
      `masterPatientIdentifier/${masterPatientIdentifier}/` +
      `recordId/${recordId}`;

    axios.put(UPDATE_URL)
      .then(() => {
        setData(prev =>
          prev.map(item =>
            item.masterPatientIdentifier === masterPatientIdentifier && item.recordId === recordId
              ? { ...item, user_Input: userInputValue === 'true' }
              : item
          )
        );
        alert('user_Input updated successfully');
      })
      .catch(() => alert('Failed to update user_Input'));
  };

  return (
    <div className="content p-3">
      <div className="table-responsive" style={{ height: '70vh' }}>
        <Table striped bordered hover>
          <thead className="sticky-header">
            <tr>
              <th>ID</th>
              <th>Identifier</th>
              <th>Data Source</th>
              <th>InputSourceARN</th>
              <th>MatchRule</th>
              <th>Src Patient ID</th>
              <th>MRN Site</th>
              <th>Name DOB</th>
              <th>Email</th>
              <th>Address</th>
              <th>Birthdate</th>
              <th>City</th>
              <th>Home Phone</th>
              <th>Mobile Phone</th>
              <th>MRN</th>
              <th>Name Family</th>
              <th>Name Given First</th>
              <th>Name Given Middle</th>
              <th>Postal Code</th>
              <th>Site ID</th>
              <th>Gender</th>
              <th>State</th>
              <th>Record ID</th>
              <th>Master Patient ID</th>
              <th>Matching Job ID</th>
              <th>User Input</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={`${item.masterPatientIdentifier}-${item.recordId}`}>
                <td>{item.id}</td>
                <td>{item.dataSourceIdentifier}</td>
                <td>{item.dataSource}</td>
                <td>{item.InputSourceARN}</td>
                <td>{item.MatchRule}</td>
                <td>{item.srcpatientidentifier}</td>
                <td>{item.mrnsite}</td>
                <td>{item.namedob}</td>
                <td>{item.emailaddress}</td>
                <td>{item.addressline}</td>
                <td>{item.birthdate}</td>
                <td>{item.city}</td>
                <td>{item.homephone}</td>
                <td>{item.mobilephone}</td>
                <td>{item.mrn}</td>
                <td>{item.namefamily}</td>
                <td>{item.namegivenfirst}</td>
                <td>{item.namegivenmiddle}</td>
                <td>{item.postalcode}</td>
                <td>{item.siteidentifier}</td>
                <td>{item.srcgenderdesc}</td>
                <td>{item.state}</td>
                <td>{item.recordId}</td>
                <td>{item.masterPatientIdentifier}</td>
                <td>{item.matchingJobId}</td>
                <td>
                  <Form.Select
                    size="sm"
                    className="small-select"
                    value={String(item.user_Input)}
                    onChange={e =>
                      handleUserInputChange(
                        item.masterPatientIdentifier,
                        item.recordId,
                        e.target.value
                      )
                    }
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataSet2;
