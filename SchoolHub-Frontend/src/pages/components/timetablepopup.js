import React from "react";


const TimeTablePopup = (props) => {

  const { data } = props
  console.log(data,'---data')
  return (
    <>
      <table className="time-table" style={{width: '100%'}} border={1}>
        <thead>
          <tr className="time-head-row">
            <th>Day</th>
            <th>
              <span>1</span>
              <br />
              9.30-10.10AM
            </th>
            <th>
              <span>2</span>
              <br />
              10.20-11.00AM
            </th>
            <th>
              <span>3</span>
              <br />
              11.00-11.40AM
            </th>
            <th>
              <span>4</span>
              <br />
              11.40-12.10PM
            </th>
            <th>
              <span>5</span>
              <br />
              1.00-1.40PM
            </th>
            <th>
              <span>6</span>
              <br />
              1.40-2.10PM
            </th>
            <th>
              <span>7</span>
              <br />
              2.20-3.00PM
            </th>
            <th>
              <span>8</span>
              <br />
              3.00-3.40PM
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="time-row" key={index}>
                <td>{item.day}</td>
                <td>
                  <div className="subject">
                    <p>
                      {item.periods.period1.class}{" "}
                      {item.periods.period1.section}
                    </p>
                    <p>{item.periods.period1.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                    <p>
                      {item.periods.period2.class}{" "}
                      {item.periods.period2.section}
                    </p>
                    <p>{item.periods.period2.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject3">
                    <p>
                      {item.periods.period3.class}{" "}
                      {item.periods.period3.section}
                    </p>
                    <p>{item.periods.period3.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject">
                    <p>
                      {item.periods.period4.class}{" "}
                      {item.periods.period4.section}
                    </p>
                    <p>{item.periods.period4.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                    <p>
                      {item.periods.period5.class}{" "}
                      {item.periods.period5.section}
                    </p>
                    <p>{item.periods.period5.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject3">
                    <p>
                      {item.periods.period6.class}{" "}
                      {item.periods.period6.section}
                    </p>
                    <p>{item.periods.period6.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject">
                    <p>
                      {item.periods.period7.class}{" "}
                      {item.periods.period7.section}
                    </p>
                    <p>{item.periods.period7.subject}</p>
                  </div>
                </td>
                <td>
                  <div className="subject2">
                    <p>
                      {item.periods.period8.class}{" "}
                      {item.periods.period8.section}
                    </p>
                    <p>{item.periods.period8.subject}</p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TimeTablePopup;
