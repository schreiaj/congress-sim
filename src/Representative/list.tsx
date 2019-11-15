import React from 'react'
import { EntityOf } from 'perform-ecs'

import { Representative } from '../model/components/representative'
import { toReact } from '../model/utils'

import {Show} from './show'

interface RepProps {
    reps: EntityOf<Representative>[]
    onUpdate: () => void
}

export const List = ({reps, onUpdate}: RepProps) => {
    return (
        <React.Fragment>
            {reps.map(rep => 
                <Show onUpdate={onUpdate} key={rep.name} rep={rep}></Show>
            )}
        </React.Fragment>
    )
}
