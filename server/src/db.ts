import knex, { Knex } from 'knex';
import camelCase from 'camelize';
import toSnakeCase from 'to-snake-case';

import { baseKnexConfig } from 'knexFile';

import { Any } from './types/common';

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  connection: {
    ...baseKnexConfig.connection,
    typeCast: (field: Any, next: Any) => {
      if (field.type == 'DATE') {
        return field.string();
      }

      return next();
    },
  },
  wrapIdentifier: (value: string, origImpl: (value: string) => string) => {
    if (value === '*') {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: result => {
    return camelCase(result);
  },
};

export default knex(knexConfig);
