const sanitizeHtml = require('sanitize-html');

const sanitizeContent = (value, helpers) => {
    // sanitizeHTML sanitize the input value
    const sanitizedValue = sanitizeHtml(value, {
        // allowedTags and allowedAttributes and purposely empty, means we do not allow any html tags or attributes
        // removed all html elements and attributes
        allowedTags: [],
        allowedAttributes: {},
    });
    // if sanitizedValue is different from actual value it means some potentially harmful content was removed during sanitization
    // if it is different it returns and error and validation fails
    // if sanitized value is same as original value , validation is successful 
    if (sanitizedValue !== value) {
        return helpers.error('any.invalid');
    }
    return sanitizedValue;
}

module.exports = sanitizeContent