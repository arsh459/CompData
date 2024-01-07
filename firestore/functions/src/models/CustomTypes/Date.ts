import { either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import * as moment from 'moment';

// represents a Date from an ISO string
export const MomentFromString = new t.Type<moment.Moment, string, unknown>(
  'MomentFromString',
  (u): u is moment.Moment => moment.isMoment(u), // typeguard 
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = moment.parseZone(s) // new Date(s)
      return !moment.isMoment(d) ? t.failure(u, c, 'Cannot parse to a moment timezone object') : t.success(d)
    }),
  a => a.format()
)