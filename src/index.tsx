/**
 * typescript 配合 react 测试
 *
 * @author wujohns
 * @date 17/10/24
 */

import * as _ from 'lodash';
import * as async from 'async';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'antd';

import * as style from './index.less';

const arr: string[] = [
    'aaa', 'bbb', 'ccc'
];
_.forEach(arr, (str: string) => console.log(str));

class Test extends React.Component {
    constructor (props: any) {
        super(props);
    }

    render () {
        return (
            <div>
                <div className={ style.content }>hahha</div>
                <Button>ddd</Button>
            </div>
        );
    }
};

ReactDOM.render((
    <div><Test/></div>
), document.querySelector('#content'));