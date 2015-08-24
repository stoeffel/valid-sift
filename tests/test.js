import { ok } from 'assert';
import valid from '../module';

const notOk = pred => ok(!pred);

describe('validSift', () => {
	it('should Check if something is a valid sift filter', () => {
		ok(valid('unicorns'));
		ok(valid(/uni/));
		ok(valid(null));
		ok(valid(undefined));
		ok(valid(true));
		ok(valid(false));
		ok(valid({}));
		ok(valid({ $regex: /foo/ }));
		notOk(valid({ $bar: /foo/ }));
		ok(valid({ name: { $regex: /foo/ }}, 'name'));
		notOk(valid({ age: { $regex: /foo/ }}, 'name'));
		notOk(valid({ name: { $nope: /foo/ }}, 'name'));
		notOk(valid({ name: { $nope: /foo/, $eq: 'hans' }}, 'name'));
		ok(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz'}]}}, 'name'));
		notOk(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz'}]}}, 'name'));
		notOk(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz', age: 13}]}}, 'name'));
		ok(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]}}, 'name', 'age'));
	});
});
