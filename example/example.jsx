import React from 'react'
import DataTable from '../'
import sampleData from './sample-data.json'

const data = sampleData.features.map(v => v.properties)

window.onload = function () {
  React.render((
    <div style={{
      position: 'absolute',
      top: 20,
      right: 50,
      bottom: 20,
      left: 50
    }}>
      <DataTable
        rows={data}
        columnBlacklist={['meta.instanceId']} />
    </div>
  ), document.body)
}
