import { ok as is } from 'assert';
import valid from '../module';

const not = pred => is(!pred);

describe('validSift', () => {
	it('should Check if something is a valid sift filter', () => {
		is(valid('unicorns'));
		is(valid(/uni/));
		is(valid(null));
		is(valid(undefined));
		is(valid(true));
		is(valid(false));
		is(valid({}));
		is(valid({ $regex: /foo/ }));
		is(valid({ name: { $regex: /foo/ }}, 'name'));
		is(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz'}]}}, 'name'));
		is(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]}}, 'name', 'age'));

		not(valid({ $bar: /foo/ }));
		not(valid({ age: { $regex: /foo/ }}, 'name'));
		not(valid({ name: { $nope: /foo/ }}, 'name'));
		not(valid({ name: { $nope: /foo/, $eq: 'hans' }}, 'name'));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz'}]}}, 'name'));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz', age: 13}]}}, 'name'));
	});
});
