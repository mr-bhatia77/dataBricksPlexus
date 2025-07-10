import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Table, Form } from 'react-bootstrap';
import './App.css';
import { sampleData } from '../services/constants';

interface DataItem {
  id: number;
  dataSourceIdentifier: string;
  dataSource: string;
  sourceTable: string;
  object: string;
  startDate: string;
  endDate: string;
  currentFlag: number;
  deletedFlag: number;
}

const FETCH_URL = 'https://your.api/endpoint/data';
const UPDATE_URL = 'https://your.api/endpoint/updateDeleteFlag';

const DataBricksPlexusPage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    axios.get<DataItem[]>(FETCH_URL)
      .then(res => setData(res.data))
      .catch(() => setData(sampleData));
  }, []);

  const handleDeleteFlagChange = (identifier: string, value: string) => {
    const newFlag = parseInt(value, 10);
    axios.post(UPDATE_URL, { dataSourceIdentifier: identifier, deleteFlag: newFlag })
      .then(() => {
        setData(prev =>
          prev.map(item =>
            item.dataSourceIdentifier === identifier
              ? { ...item, deletedFlag: newFlag }
              : item
          )
        );
        alert('Successfully updated');
      })
      .catch(() => alert('Failed to update deleteFlag'));
  };

  return (
    <>
      <div className={`page-heading ${sidebarExpanded ? 'shifted' : ''}`}>
        <h1>Data bricks Plexus</h1>
      </div>

      <div className="layout">
        <div
          className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
        >
          <div className="home-item">
            <i className="bi bi-house-fill home-icon"></i>
            <span className="home-text">Home Page</span>
          </div>
        </div>

        <div className="content">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="sticky-header">
                <tr>
                  <th>ID</th>
                  <th>Data Source Identifier</th>
                  <th>Data Source</th>
                  <th>Source Table</th>
                  <th>Object</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Current Flag</th>
                  <th>Delete Flag</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.dataSourceIdentifier}</td>
                    <td>{item.dataSource}</td>
                    <td>{item.sourceTable}</td>
                    <td>{item.object}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.currentFlag}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        className="small-select"
                        value={String(item.deletedFlag)}
                        onChange={e => handleDeleteFlagChange(item.dataSourceIdentifier, e.target.value)}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </Form.Select>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataBricksPlexusPage;
