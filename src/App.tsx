import {useState} from 'react';
import React from 'react'
import logo from './logo.svg';
import './App.css';


import { ECS } from 'perform-ecs'

import {Representative, factory as RepFactory } from './model/components/representative'
import {VotingSystem} from './model/systems/VotingSystem'
import {toReact} from './model/utils'

const ecs = new ECS()
const  voters  = new VotingSystem()
ecs.registerSystem(voters)

const makeReps = RepFactory(ecs)


const App: React.FC = () => {
  const [step, setStep] = useState(0)
  const addRep  = () => {
    makeReps(0.0, 0.0, "Ass Hat",  0)
    setStep(step + 1)
  }
  ecs.update(0.0)
  return (
    <div className="App">
      {voters.voters.entities.map((ent) => {
        const json = toReact(ent)
        return (
          <div key={json.name}>
            Test
            {json.name}
          </div>
        )
      })}
      <button onClick={addRep}>+</button>
    </div>
  );
}

export default App;
