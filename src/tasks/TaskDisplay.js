import React from 'react';
import Utils from "../utils"
import Data from "../data/Data"

let TaskDisplay = (props) => {
  let gfi = props.gfi ? props.gfi : 0
  console.log("task disp", gfi, props.tasks, props.logs)
  let grouped = group(props.tasks, gfi)

  console.log("final", grouped, grouped instanceof Array)

  if (!(grouped instanceof Array)) {
    let containers = Object.keys(grouped).map(k => {
      let v = grouped[k]
      console.log("building containers", k, v)
      let meta = Utils.secondsToHuman(Utils.sumTimeOfTasks(v.children, props.logs), false /*show seconds */)
      return (
        <GroupContainer title={v.title} meta={meta} key={k}>
          <TaskDisplay tasks={v.children} gfi={gfi + 1} logs={props.logs}/>
        </GroupContainer>
      )
    });
    return (<span>{containers}</span>)
    // return (<GroupContainer>{containers}</GroupContainer>)
  } else {
    return (<TaskList tasks={grouped} logs={props.logs}/>)
  }
};

const groupingFunctions = [
  // project
  {title: "Project", nameFunc: (groupKey) => (groupKey), groupKeyFunc: (i) => (i.projectName)},
  {
    title: "Epic", nameFunc: (groupKey) => {
    console.log("epic gk", groupKey, Data.epics)
    if (groupKey) {
      return Data.epics.find(e => (e.key === groupKey)).summary
    } else {
      return "Epicless"
    }
  }, groupKeyFunc: (i) => (i.epicKey)
  }
]

const group = (tasks, depthIndex) => {
  let gf = groupingFunctions[depthIndex]
  if (!gf) {
    return tasks
  }

  let tasksWithKeys = tasks.map((t) => {
    return Object.assign({}, t, {group: gf.groupKeyFunc(t)})
  })
  console.log("twk", tasksWithKeys)
  let groupKeys = new Set(tasksWithKeys.map((t) => (t.group)))
  console.log("gk", groupKeys)

  let grouped = {}
  groupKeys.forEach((g) => {
    let filtered = tasksWithKeys.filter((t) => (t.group === g))
    grouped[g] = {
      title: gf.title + " " + gf.nameFunc(g),
      children: filtered
    }
  })
  console.log("grouped", grouped)
  return grouped
}

const GroupContainer = (props) => {
  return (<div className="container" style={styles.container}>
    <div className="container-title">
      {props.title}
    </div>
    <div className="container-body">
      {props.children}
    </div>
    <div className="container-meta">
      {props.meta}
    </div>
  </div>)
}

const TaskList = (props) => {
  console.log("list", props)
  return (
    <ul style={styles.list}>
      {props.tasks.map((t) => {
        return (<li key={t.key} style={styles.tile}>
          <p>{t.summary}</p>
          <p>{Utils.secondsToHuman(props.logs[t.id], false)}</p>
        </li>)
      })}
    </ul>
  )
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  list: {
    // display: 'flex',
    // justifyContent: 'space-around'
  },
  tile: {},
  container: {
    marginLeft: 15
  }
};


export default TaskDisplay