import React from 'react';

const TimeLine = (props) => {
  let logsWithSizes = Object.keys(props.logs).map(k => {
    let v = props.logs[k]
    console.log("timeline taks", k, v)
    return {taskId: k, size: Math.floor(v / 60)}
  })

  return (
    <div>
      {logsWithSizes.map(l => {
        let s = Object.assign({}, style, {width: l.size})
        return (
          <div key={l.taskId} style={s}>{l.taskId}</div>
        )
      })}
    </div>
  )
}

const style = {
  overflow: 'hide',
  borderWidth: 1,
  borderColor: 'black',
  borderStyle: 'solid',
  display: "inline-block"
}

export default TimeLine