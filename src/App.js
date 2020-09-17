import React, { Component } from 'react';
import logo from './logo.svg';

import { Layout } from 'antd'
import { Form, Input, Button } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import getHostTest from './mongo/host-test';

function App() {

  async function alertic() {
    try {
      const host = await getHostTest();
      alert(host.host)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Button
          onClick={alertic}
          // size="medium"
        >

        </Button>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
