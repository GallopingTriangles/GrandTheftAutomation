import React, { Component } from 'react';

class Bugs extends Component {

	render() {
		return (
      <div className='instructions'>

        { this.props.bugs.map(message => {
          console.log(message);
          return (
            <div>
              <p className='fa fa-bug' aria-hidden='true'></p>
              <p>{message}</p>
            </div>
          )
        })}

      </div>
		);
	}
}

// function formatBugs(message) {
//   return (
//     <div>
//       {message.split(' ').map((word, i) => {
//         if (word.indexOf('()') > -1) {
//           return (<p style={{ display: 'inline', margin: 0, "padding-right": '3px' }}><span style={{ color: 'yellow', margin: 0, 'padding-right': 0 }}>{ word }</span></p>);
//         } else if (word.indexOf('undefined') > -1) {
//           return (<p style={{ display: 'inline', margin: 0, "padding-right": '3px' }}><span style={{ color: '#ae81ff', margin: 0, "padding-right": 0 }}>{ word }</span></p>);
//         } else {
//           return (<p style={{ display: 'inline', margin: 0, "padding-right": '3px' }}>{ word }</p>);
//         }
//       })}
//     </div>
//   )
//


  // var words = message.split(' ');
  // var i;
  // words.forEach((word, ind) => {
  //   if (word.indexOf('()') > -1) {
  //     i = ind;
  //   }
  // })
  // if (!i) { // if there is no function in it
  //   return message;
  // }

  // var first = '';
  // var last = '';
  // var span = (<span>{ words[i] }</span>);
  // words.forEach((word, ind) => {
  //   if (ind < i) {
  //     first += word + ' ';
  //   } else if (ind > i) {
  //     last += word + ' '
  //   }
  // })
  // return (
  //   <p>
  //     <p style={{ display: 'inline '}} >{ first }</p>{ span }<p style={{ display: 'inline '}} >{ last }</p>
  //   </p>
  // )
// }

export default Bugs;
