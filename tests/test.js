import { ok as is, deepEqual as isImmutable } from 'assert';
import valid from '../module';

const not = pred => is(!pred);

describe('validSift', () => {
	it('should check if something is a valid sift filter', () => {
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
	});

	it('should check if something is not valid sift filter', () => {
		not(valid({ $bar: /foo/ }));
		not(valid({ age: { $regex: /foo/ }}, 'name'));
		not(valid({ name: { $nope: /foo/ }}, 'name'));
		not(valid({ name: { $nope: /foo/, $eq: 'hans' }}, 'name'));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz'}]}}, 'name'));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$ep: 'Moritz', age: 13}]}}, 'name'));
	});

	it('should take an array with allowed attributes too', () => {
		is(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]}}, ['name', 'age']));
		is(valid({ name: { $or: [{$eq: 'Max'}]}}, ['name']));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', foo: 13}]}}, ['name', 'age']));
		not(valid({ name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', foo: 13}]}}, ['name']));
	});

	it('should not change the filter', () => {
    const filter = { name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]}};
    const clone = Object.assign({}, filter);

		is(valid(filter, 'name', 'age'));
		isImmutable(filter, clone);

    const notValidFilter = { name: { $or: [{$eq: 'Max'}, {$eq: 'Moritz', age: 13}]}};
    const cloneNotValid = Object.assign({}, notValidFilter);

		not(valid(notValidFilter, 'name'));
		isImmutable(notValidFilter, cloneNotValid);
	});
});
