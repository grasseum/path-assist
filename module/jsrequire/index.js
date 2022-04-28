const unixpath = require('../unix');
const {each, clone,indexOf,lastIndexOf,count,limit ,getValue} = require("structkit");
const fsRequire = require("fs");
const pathRequire = require("path");

exports.isLocalPath=function (path) {

    return (/^([.]{1,}[/]{1,})/g).test(path);

};

/**
 * getRequirePackageFileAsync
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} path The first number in an addition.
 * @returns {Object} Return the value for file findings.
 * @example
 *
 * getRequireScriptFile('struct')
 * // => {'isValid':true,'path':/User/home/struct/index.js}
 */
 async function getRequirePackageFileAsync (path) {
    const packageData = getRequireLocation(path);

    const variableData = {};

    variableData.isValid =packageData.isValid;
    variableData.data = "";

    if(packageData.isValid){
        try{
            const fileRead = await fsRequire.readFileSync( pathRequire.join(packageData['modulePath'],"package.json" ));
            //console.log(fileRead.toString(),":fileRead")
            variableData.data = fileRead.toString();
        }catch(error){
            
            variableData.isValid =false;
            variableData.error =error.toString();
        }
        
    }
    return variableData;

 }
 
/**
 * GetRequireScriptFile
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} path The first number in an addition.
 * @returns {Object} Return the value for file findings.
 * @example
 *
 * getRequireScriptFile('struct')
 * // => {'isValid':true,'path':/User/home/struct/index.js}
 */
function getRequireLocation (path) {

    const variableData = {};

    try {

        variableData.isValid =true;
        variableData.path =require.resolve(path);
        const splitPath = variableData.path.split("/");
        const splitPath2 = path.split("/");
        const getLastIndexPath = lastIndexOf(splitPath , splitPath2[ count(splitPath2)-1 ]) 
        variableData.modulePath = getValue( limit( splitPath , 0,getLastIndexPath ) ).join("/");

    } catch (error) {

        variableData.isValid =false;
        variableData.error =error.toString();

    }

    return variableData;

}

/**
 * GetNodeModulePath
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} path The first number in an addition.
 * @param {string} baseScriptDirectory The first number in an addition.
 * @returns {Object} Return the value for file findings
 * @example
 *
 * getNodeModulePath('struct','struct')
 * // => {'isValid':true,'path':/User/home/struct}
 */
function getNodeModulePath (path, baseScriptDirectory) {

    const variableData = {};

    const requireFile = getRequireScriptFile(path);

    if (requireFile.isValid) {

        variableData.isValid=requireFile.isValid;

        const reservePath = [];
        let allocatePath = [];
        const pathSplit = path.split("/");
        const pathUnixSplit = unixpath.cleanDirPath(requireFile.path).split("/");

        let reference_valid_count = 0;

        const join_node_path =pathRequire.join(baseScriptDirectory, 'node_modules/'+path);

        if (fsRequire.existsSync(join_node_path)) {

            variableData.error =requireFile.error;
            variableData.path =join_node_path;

        } else {


            each(pathUnixSplit, (key, value) => {

                reservePath.push(value);
                if (indexOf(pathSplit,value) ===reference_valid_count) {

                    reference_valid_count+=1;

                } else {

                    reference_valid_count =0;

                }

                if (pathSplit.length === reference_valid_count) {

                    allocatePath = clone(reservePath);

                }


            });
            variableData.error =requireFile.error;
            variableData.path =allocatePath.join("/");

        }


    } else {

        variableData.isValid=requireFile.isValid;
        variableData.error =requireFile.error;

    }

    return variableData;

}

/**
 * joinPath
 *
 * @since 1.0.1
 * @category filesystem
 * @param {string} path The first number in an addition.
 * @param {string} baseScriptDirectory The first number in an addition.
 * @returns {Object} Return the value for file findings
 * @example
 *
 * joinPath('/User/home/struct','struct.js')
 * // => /User/home/struct/
 */
 function joinPath () {

    if(arguments.length == 0 ){
        return ".";
    }
    let baseDir =  unixpath.cleanPathname( arguments[0] );
    const baseDirExt = pathRequire.extname(baseDir);

    const isDir = fsRequire.lstatSync(baseDir).isDirectory()

    for(const key in arguments){
        if( key>=1 ){

            const rawIsDir = fsRequire.lstatSync(baseDir).isDirectory()
            const splitBaseDir = baseDir.split("/")
         
            if(rawIsDir) {

                baseDir = pathRequire.join(  getValue( limit(splitBaseDir,0,splitBaseDir.length-1) ).join("/") ,arguments[key]+baseDirExt );
            }else{

                baseDir = pathRequire.join(  getValue( limit(splitBaseDir,0,splitBaseDir.length-2) ).join("/") ,arguments[key]+baseDirExt );
            }
            
        }
    }
    return baseDir;
 }


exports.getRequireLocation =getRequireLocation;
exports.getNodeModulePath =getNodeModulePath;
exports.getRequirePackageFileAsync =getRequirePackageFileAsync;
exports.joinPath =joinPath;
