import React, { PropTypes } from 'react'
import { Table } from 'fixed-data-table'
import GetContainerDimensions from 'react-dimensions'
import getColumnNodes from './get-column-nodes.jsx'
import { Styles } from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

let ThemeManager = new Styles.ThemeManager()

// https://www.google.com/design/spec/components/data-tables.html#data-tables-specs
const layout = {
  headerHeight: 56,
  rowHeight: 48
}

// The GetContainerDimensions decorator injects the containerWidth
// and containerHeight into the props
@GetContainerDimensions()
class DataTable extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    forceUpdateColumns: PropTypes.bool,
    columnOrder: PropTypes.arrayOf(PropTypes.string),
    columnPriority: PropTypes.arrayOf(PropTypes.string),
    columnBlacklist: PropTypes.arrayOf(PropTypes.string)
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext () {
    return { muiTheme: ThemeManager.getCurrentTheme() }
  }

  state = {
    columnNodes: getColumnNodes(this.props)
  }

  getRow = (rowIndex) => {
    return this.props.rows[rowIndex]
  }

  // Recalculating which columns should be displayed is expensive so we don't
  // do it when `props.containerHeight` changes, or when`props.rows` changes,
  // unless `props.forceUpdateColumns === true`.
  // This avoids columns changing when filtering `props.rows` for search etc.
  componentWillReceiveProps (nextProps) {
    const prevProps = this.props

    const shouldRecalculateColumns =
      nextProps.containerWidth !== prevProps.containerWidth ||
      nextProps.columnOrder !== prevProps.columnOrder ||
      nextProps.columnPriority !== prevProps.columnPriority ||
      nextProps.columnBlacklist !== prevProps.columnBlacklist ||
      nextProps.forceUpdateColumns && nextProps.rows !== prevProps.rows

    if (!shouldRecalculateColumns) return

    this.setState({
      columnNodes: getColumnNodes(nextProps)
    })
  }

  render () {
    const { rows, containerWidth, containerHeight } = this.props
    const { columnNodes } = this.state

    return (
      <Table
        rowHeight={layout.rowHeight}
        rowGetter={this.getRow}
        rowsCount={rows.length}
        width={containerWidth}
        height={containerHeight}
        onColumnResizeEndCallback={() => void 0}
        headerHeight={layout.headerHeight}>
        {columnNodes}
      </Table>
    )
  }
}

export default DataTable
