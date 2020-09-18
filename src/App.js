import React, { Component } from 'react';
import logo from './logo.svg';

import { Layout } from 'antd'
import { Form, Input, Button } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import getHostTest from './mongo/host-test';
import getBorTest from './mongo/get-whole-bor';

function App() {

  async function alertic() {
    try {
      const host = await getHostTest();
      alert(host.host)
    } catch (error) {
      console.log(error)
    }
  }

  async function showAllBor() {
    try {
      const bor = await getBorTest();
      console.log(bor);
      alert(bor)
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
          className='main-button'
          size='large'
          shape='round'
          onClick={alertic}
        // size="medium"
        >Тест API</Button>

        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={showAllBor}
        // size="medium"
        >Тест whole-Bor</Button>
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
