/**
 * typescript 测试
 *
 * @author wujohns
 * @date 17/10/20
 */
import * as _ from 'lodash';
import { auto } from 'async';
import { say } from './utils';

const deviceType: string = say('deviceType');
const arr: string[] = [
    'aaa', 'bbb', 'ccc'
];

console.log(deviceType);
_.forEach(arr, (str: string) => console.log(str));

auto({
    delay: (callback) => {
        setTimeout(() => {
            console.log('----- delay ----');
            return callback();
        }, 1000);
    }
}, Infinity, (err) => {
    console.log(err);
});