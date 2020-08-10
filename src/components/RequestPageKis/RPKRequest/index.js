import React from 'react';
import classes from './RPKRequest.module.scss';

export default class RPKRequest extends React.Component {
  insertClasses = [classes.RPKRequest];

  render() {
    // console.log(this.props.operation);
    return (
      <div className={this.insertClasses.join(' ')}>
        <div className={classes.RPKRequest__table}>
          <table>
            <tbody>
              <tr style={{ backgroundColor: this.props.trColor }}>
                <td>
                  {this.props.firstEl ? '5x' : ''}
                </td>
                <td>
                  {this.props.firstEl ? this.props.operation.request : ''}
                </td>
                <td>
                  {this.props.operation.type === 'income'
                    ? this.props.operation.client
                    : ''}
                </td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                      height:
                        this.props.operation.type === 'income' ? '70%' : '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {this.props.operation.type === 'income'
                      ? parseFloat(+this.props.operation.value).toFixed(2) +
                        ' руб.'
                      : ''}
                  </div>

                  {this.props.operation.type === 'income' ? (
                    <div
                      style={{
                        display: 'flex',
                        flexGrow: 1,
                        height: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFF5C2',
                      }}
                    >
                      {this.props.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      flexGrow: 1,
                      height:
                        this.props.operation.type === 'outcome'
                          ? '70%'
                          : '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {this.props.operation.type === 'outcome'
                      ? parseFloat(+this.props.operation.value).toFixed(2) +
                        ' руб.'
                      : ''}
                  </div>

                  {this.props.operation.type === 'outcome' ? (
                    <div
                      style={{
                        display: 'flex',
                        flexGrow: 1,
                        height: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFF5C2',
                      }}
                    >
                      {this.props.operation.date}
                    </div>
                  ) : null}
                </td>
                <td>
                  {this.props.operation.type === 'outcome'
                    ? this.props.operation.client
                    : ''}
                </td>
                <td>{this.props.operation.destination}</td>
                <td>{this.props.operation.comment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
