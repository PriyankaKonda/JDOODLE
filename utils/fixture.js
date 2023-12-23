const base = require('@playwright/test');
exports.customtest = base.test.extend({
    Sections: 
    [ 's',
    'New Project',
    'My Projects',
    'Execute History',
    'Collaborate',
    'Save',
    'Save As',
    'Editable Share',
    'Instant Share (No Login/Save required)',
    'Copy to Clipboard',
    'Open (from local file)',
    'Save (to local file)',
    'Pretty Print'] 
}
)