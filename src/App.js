import React, { Component } from 'react';
import logo from './logo.svg';

import { Layout } from 'antd'
import { Form, Input, Button } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import getHostTest from './mongo/host-test';
import getBorTest from './mongo/get-whole-bor';
import fetchOwnApi from './mongo/fetch-api-data';

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
      console.log(bor.data);
      alert(JSON.stringify(bor.data, null, " "))
    } catch (error) {
      console.log(error)
    }
  }

  async function showTestData(_apiRef) {
    try {
      console.log("showTestData - ", _apiRef);
      const data = await fetchOwnApi(_apiRef);
      console.log("  showTestData - ", data);
      alert(data.data[0].name);
      alert(JSON.stringify(data.data[0], null, " "));
      // alert(data)
    } catch (error) {
      console.log("showTestData Error-  ", error)
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
        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={() => showTestData('/.netlify/functions/findPlayer/allbase')}
        // size="medium"
        >Тест mongo-allbase</Button>
        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={() => showTestData('/.netlify/functions/allplayers')}
        // size="medium"
        >Тест mongo-allbase 2 </Button>
        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={() => showTestData('/.netlify/functions/findPlayer/allfirebase')}
        // size="medium"
        >Тест firebase-allbase</Button>
        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={() => showTestData('/.netlify/functions/api/db-test')}
        // size="medium"
        >db-test</Button>
        <Button
          className='main-button'
          size='large'
          shape='round'
          onClick={() => showTestData('/.netlify/functions/api/pairs')}
        // size="medium"
        >pairs</Button>
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
