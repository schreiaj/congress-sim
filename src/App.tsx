import { useState, useEffect } from 'react';
import React from 'react'
import logo from './logo.svg';
import './App.css';


import { ECS } from 'perform-ecs'

import { Representative, factory as RepFactory } from './model/components/representative'
import { VotingSystem } from './model/systems/VotingSystem'
import { List } from './Representative/list';

const ecs = new ECS()
const voters = new VotingSystem()
ecs.registerSystem(voters)

const makeReps = RepFactory(ecs)


const App: React.FC = () => {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    if (isRunning) {
      setTimeout(() => {
        ecs.update(1)
        setStep(step + 1)
      }, 1000)
    }
  }, [step, isRunning])
  const addRep = () => {
    makeReps(0.0, 0.0, "Rep", 0)
    setStep(step + 1)
  }
  ecs.update(0.0)
  return (
    <div className="App">
      {step}
      <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stop' : 'Start'}</button>

      <List reps={voters.voters.entities} onUpdate={() => { }} />
      <button onClick={addRep}>+</button>
    </div>
  );
}

export default App;
