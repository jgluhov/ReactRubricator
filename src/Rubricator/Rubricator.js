import React from 'react';
import './Rubricator.scss';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Point } from './Point/Point';
import { RubricatorHeader } from './Header/Header';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 50
});
const columnIndex = 0;

const updatePoints = (point, allPoints) => {
  const renderedPointIndex = allPoints
    .findIndex(p => p.id === point.id);

  return [
    ...allPoints.slice(0, renderedPointIndex),
    {
      ...point,
      expanded: !point.expanded
    },
    ...allPoints.slice(renderedPointIndex + 1)
  ];
};

const Rubricator = React.memo(({ points }) => {
  const listRef = React.useRef();
  const [ renderedPoints, setRenderedPoints ] = React.useState(points);
  const [ header, setHeader ] = React.useState({});

  React.useEffect(() => {
    listRef.current.recomputeRowHeights();
    listRef.current.forceUpdate();
  }, [renderedPoints, header]);

  React.useEffect(() => {
    setTimeout(() => {
      listRef.current.scrollToRow(22);
    }, 5000)
  }, [])

  const isHeader = index => index === 0;

  const cellRenderer = ({ index, parent, key, style }) => {
    const dIndex = isHeader(index)
      ? index : index - 1;

    const point = renderedPoints[dIndex];

    const togglePoint = (event) => {
      event.stopPropagation();
      cache.clear(index, columnIndex);
      setRenderedPoints(updatePoints(point, renderedPoints));
    };

    const toggleHeader = (event) => {
      event.stopPropagation();
      cache.clear(index, columnIndex);
      setHeader({ expanded: !header.expanded })
    }

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={index}
      >
        { isHeader(index)
          ? <RubricatorHeader header={header} onClick={toggleHeader} />
          : <Point point={point} style={style} onClick={togglePoint} />
        }
      </CellMeasurer>
    )
  }

  return (
    <div className="Rubricator__Container">
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              ref={listRef}
              height={height}
              width={width}
              rowCount={points.length + 1}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={cellRenderer}
              overscanRowCount={3}
            />
          );
        }}
      </AutoSizer>
    </div>
  )
})

export default Rubricator;