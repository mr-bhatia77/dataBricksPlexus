import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

interface DataItem {
  id: number;
  dataSourceIdentifier: string;
  dataSource: string;
  sourceTable: string;
  object: string;
  startDate: string;
  endDate: string;
  currentFlag: number;
  deletedFlag: string;
}

const FETCH_URL = 'https://vivagoals-qa.analytics.crohnscolitisfoundation.org/vivagoals/show/Databricks/fetchData';

const HomePage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    axios.get<DataItem[]>(FETCH_URL)
      .then(res => setData(res.data))
      .catch(() => alert('Something went wrong! Failed to fetch data'));
  }, []);

  const handleDeleteFlagChange = (identifier: string, value: string) => {
    const UPDATE_URL =
      `https://vivagoals-qa.analytics.crohnscolitisfoundation.org/vivagoals/update/DatabricksData/deletedflag/${value}/dataSourceIdentifier/${identifier}`;

    axios.put(UPDATE_URL)
      .then(() => {
        setData(prev =>
          prev.map(item =>
            item.dataSourceIdentifier === identifier
              ? { ...item, deletedFlag: value }
              : item
          )
        );
        alert('Successfully updated');
      })
      .catch(() => alert('Failed to update deleteFlag'));
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
                <td>{new Date(item.startDate).toISOString().slice(0, 10)}</td>
                <td>{new Date(item.endDate).toISOString().slice(0, 10)}</td>
                <td>{item.currentFlag ? 'true' : 'false'}</td>
                <td>
                  <Form.Select
                    size="sm"
                    className="small-select"
                    value={String(item.deletedFlag)}
                    onChange={e =>
                      handleDeleteFlagChange(item.dataSourceIdentifier, e.target.value)
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

export default HomePage;
