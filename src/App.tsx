import React, { Component } from 'react';
import Scene from './raytrace/Scene';
import logo from './logo.svg'
import './App.css';
import PerspectiveCamera from './raytrace/PerspectiveCamera';
import Vector3 from './raytrace/Vector3';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
          <div>Simple Raytrace Demo with Typescript.</div>
        </header>
  
        <canvas width="512" height="512" ref="canvas">
          <code>Canvas</code> is not supported.
        </canvas>
      </div>
    );  
  }

  componentDidMount() {
    const canvas = this.refs["canvas"] as HTMLCanvasElement;
    const scene = new Scene(
      canvas,
      new PerspectiveCamera(
        new Vector3(0, 5, 15),
        new Vector3(0, 0, -1).normalize(),
        new Vector3(0, 1, 0).normalize(),
        90
      ),
      20);
    scene.initialize();
    scene.render();
  }
}

export default App;
