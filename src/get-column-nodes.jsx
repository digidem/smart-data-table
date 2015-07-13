import React from 'react'
import { Column } from 'fixed-data-table'
import flatten from 'flat'
import getValue from 'get-value'
import { DropDownMenu } from 'material-ui'

const MIN_COLUMN_WIDTH = 200
const COLUMN_PADDING = 56

/**
 * [getColumnNodes description]
 * @param  {Array}  options.rows           [description]
 * @param  {Array}  options.columnOrder    [description]
 * @param  {Array}  options.columnPriority [description]
 * @param  {Number} options.containerWidth [description]
 * @return {[type]}                        [description]
 */
export default function getColumnNodes ({
  rows = [],
  columnOrder = [],
  columnPriority = [],
  columnBlacklist = [],
  containerWidth = 0,
  minColumnWidth = MIN_COLUMN_WIDTH,
  columnPadding = COLUMN_PADDING
}) {
  // Start with the column keys defined in `columnOrder`
  const orderedKeys = new Set(columnOrder)

  // Any keys in the row objects not defined in `columnOrder`
  // will be appended to the list of column keys. Nested keys
  // will be returned as single `.`-delimited strings as in
  // https://github.com/hughsk/flat#flattenoriginal-options
  // These serve as property paths (`a.b.c`)
  rows.forEach(row => {
    Object.keys(flatten(row)).forEach(key => orderedKeys.add(key))
  })

  // Remove any keys in the blacklist
  columnBlacklist.forEach(key => orderedKeys.delete(key))

  // The max number of columns we can fit in the container whilst
  // maintaining `MIN_COLUMN_WIDTH`
  const columnCount = Math.floor(containerWidth / (minColumnWidth + columnPadding))

  // Filter columnPriority to only keys we have in `columnKeyset`,
  // and no more than `columnCount`
  const priorityKeys = new Set(columnPriority
    .filter(key => orderedKeys.has(key))
    .slice(0, columnCount))

  // Finally columnKeys are the intersection of our ordered keys and `priorityKeys`,
  // maintaining the order of `orderedKeys`
  const columnKeys = [...orderedKeys].slice(0, columnCount) // .filter(key => priorityKeys.has(key))

  function renderHeader (label) {
    let menuItems = [...orderedKeys].slice(columnCount)

    menuItems.unshift(label)

    menuItems = menuItems.map((v, i) => {
      return { payload: i, text: v }
    })
    console.log(menuItems)
    let selectedIndex = 0
    return <DropDownMenu menuItems={menuItems} selectedIndex={selectedIndex} />
  }

  return columnKeys.map(key => (
    <Column
      label={key}
      width={MIN_COLUMN_WIDTH}
      isResizable={true}
      flexGrow={1}
      dataKey={key}
      key={key}
      cellDataGetter={getCellData}
      headerRenderer={renderHeader}
    />
  ))
}

function getCellData (cellDataKey, rowData) {
  // getValue uses property paths (`a.b.c`) to get nested data from an object
  return getValue(rowData, cellDataKey)
}
