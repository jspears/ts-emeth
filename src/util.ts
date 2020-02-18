const STYLE_RE = /.+?\/(?:([^/]+?)\/styles|([^/]+?))\.(?:module\.css|cssm)$/;
export const fileToClassName = (fileName: string): string => fileName.replace(STYLE_RE, '$1$2');

