
import React from 'react'
import {useState} from 'react'
import { EntityOf } from 'perform-ecs'
import {Stack, RangeSelector, Box, Text} from 'grommet'

import { Representative } from '../model/components/representative'
import { toReact } from '../model/utils'

interface RepProps {
    rep: EntityOf<Representative>
    onUpdate: () => void
}

export const Show = ({rep, onUpdate}: RepProps) => {
    
    return (
        <React.Fragment>
            <Stack>
                {rep.name}
                {rep.lean}
            </Stack>
        </React.Fragment>
    )
}



// <Stack>
//       <Box direction="row" justify="between">
//         {Array.from({length: 10}, (x,i) => i-5).map(value => (
//           <Box key={value} pad="xsmall" border={false}>
//             <Text style={{ fontFamily: 'monospace' }}>
//               {value}
//             </Text>
//           </Box>
//         ))}
//       </Box>
//       <RangeSelector
//         direction="horizontal"
//         invert={false}
//         min={-1}
//         max={1}
//         step={0.1}
//         size="full"
//         round="small"
//         values={values}
//         onChange={values => setValues(values)}
//       />
//     </Stack>