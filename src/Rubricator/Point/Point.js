import React from 'react';
import './Point.scss';

export const Point = ({ point, style, onClick }) => {
  const imageUrl = point.functions[0].marker;
  return (
    <div className="Point" style={style} onClick={onClick}>
      <div className="Point__Header">
        <img className="Point__HeaderImage" src={imageUrl} alt="/" />
        <h6 className="Point__HeaderTitle">{ point.title }</h6>
      </div>
      <div className="Point__Content">
        <div className="Point__Description"
          dangerouslySetInnerHTML={{
            __html: point.description
          }} />
        { point.expanded && (
          <div className="Point__Info">
            <p>{ point.url }</p>
            <p>{ point.email }</p>
            <p>{ point.phone }</p>
          </div>
        )}
      </div>
    </div>
  );
}