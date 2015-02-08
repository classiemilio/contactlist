window.App = {
    Views: {},
    Models: {}, // Uppercase for the Model classes
    models: {},  // Lowercase for instances of models that are used in multiple places
    consts: {
        'Events': {
            'Export:Clicked': '"Export Contacts" button was clicked.',
            'Export:Succeeded': '"Export Contacts" succeeded!',
            'Export:Failed': '"Export Contacts" failed.',
            'Import:Submitted': '"Import to Contacts" form was submitted.',
            'Import:Succeeded': '"Import to Contacts" succeeded!',
            'Import:Failed': '"Import to Contacts" failed, likely improper JSON.',
            'Add:Submitted': '"Add Contact" form was submitted.',
            'Add:Failed': '"Add Contact" form submission failed, likely missing field(s).',
            'Add:Succeeded': '"Add Contact" succeeded!',
            'Json:Edited': 'The "Import JSON Contacts" textarea was edited.',
            'Add:FirstName:Edited': 'The "First Name" field was edited.',
            'Add:LastName:Edited': 'The "Last Name" field was edited.',
            'Add:PhoneNumber:Edited': 'The "Phone #" field was edited.',
            'Remove:Clicked': '"Remove Contact" button was clicked.',
            'Remove:Succeeded': '"Remove Contact" succeeded!',
            'Remove:Failed': '"Remove Contact" failed.'
        }
    }
}