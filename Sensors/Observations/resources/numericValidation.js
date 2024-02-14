module.exports = class NumericValidation {
    isValid(data, upperLimit, lowerLimit) {
        return data <= upperLimit && data >= lowerLimit;
    }
}