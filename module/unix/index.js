/**
 * RegexpMatch
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} regexp The first number in an addition.
 * @param {string} paths The first number in an addition.
 * @returns {boolean} Return the value for file findings.
 * @example
 *
 * regexpMatch('*','path')
 * // => true
 */
exports.regexpMatch = function (regexp, paths) {

    if ((/^\*$/g).test(regexp)) {

        regexp= regexp.replace(/\*/g, "([\\w\\d\\s-\\_\\@]{1,})");
        regexp= regexp.replace(/\./g, "\\.");
        const reg = new RegExp(""+regexp+"", "g");


        return reg.test(paths);

    }

    regexp= regexp.replace(/\*/g, "([\\w\\d\\s-\\_\\@]{1,})");
    regexp= regexp.replace(/\./g, "\\.");
    const reg = new RegExp("^"+regexp+"$", "g");

    return reg.test(paths);


};

/**
 * CleanDirPath
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} paths The first number in an addition.
 * @returns {string} Return the value for file findings.
 * @example
 *
 * cleanDirPath('\path\')
 * // => path
 */
exports.cleanDirPath = function (paths) {

    let strPath = paths.replace(/\/$/g, "");

    if (process.platform === "win32") {

        strPath = strPath.replace(/\\/g, "/");

    }

    return strPath;

};

/**
 * CleanPathname
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} paths The first number in an addition.
 * @returns {string} Return the value for file findings.
 * @example
 *
 * CleanPathname('\path\')
 * // => path
 */
exports.cleanPathname = function (paths) {

    if (process.platform === "win32") {

        paths = paths.replace(/\\/g, "/");

    }

    return paths;

};
