export const encrypt = (str: string): string => Buffer.from(str, 'utf8').toString('base64');

export const decrypt = (str: string): string => Buffer.from(str, 'base64').toString('utf8');
