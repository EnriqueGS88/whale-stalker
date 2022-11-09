module.exports = {
    start: new Date().toLocaleString().replace(',',''),
    end: new Date().toLocaleString().replace(',',''),
    fileID: new Date().toLocaleString().replaceAll('/','').replaceAll(':','').replaceAll(', ','_')
}