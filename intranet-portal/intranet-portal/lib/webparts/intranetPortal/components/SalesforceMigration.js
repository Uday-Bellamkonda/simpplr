var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useState } from 'react';
import { TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, SelectionMode } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { salesforceConfig } from '../../../config/salesforceConfig';
export var SalesforceMigration = function (props) {
    var _a = useState(''), objectApiName = _a[0], setObjectApiName = _a[1];
    var _b = useState(''), listName = _b[0], setListName = _b[1];
    var _c = useState([]), columnMappings = _c[0], setColumnMappings = _c[1];
    var _d = useState([]), records = _d[0], setRecords = _d[1];
    var _e = useState(false), isAnalyzing = _e[0], setIsAnalyzing = _e[1];
    var _f = useState(false), isMigrating = _f[0], setIsMigrating = _f[1];
    var _g = useState(''), statusMessage = _g[0], setStatusMessage = _g[1];
    var _h = useState(null), totalCount = _h[0], setTotalCount = _h[1];
    var sp = spfi().using(SPFx(props.context));
    var getSalesforceToken = function () { return __awaiter(void 0, void 0, void 0, function () {
        var params, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = new URLSearchParams();
                    params.append('grant_type', 'client_credentials'); // Using client credentials as per request logic, although Salesforce requires more setup for this.
                    params.append('client_id', salesforceConfig.clientId);
                    params.append('client_secret', salesforceConfig.clientSecret);
                    return [4 /*yield*/, fetch("".concat(salesforceConfig.oauthDomain, "/services/oauth2/token"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: params.toString()
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to get token: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.access_token];
            }
        });
    }); };
    var fetchSalesforceData = function (token, url, allRecords) {
        if (allRecords === void 0) { allRecords = []; }
        return __awaiter(void 0, void 0, void 0, function () {
            var response, data, combinedRecords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                                'Content-Type': 'application/json',
                                'Sforce-Query-Options': 'batchSize=2000'
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch data: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        combinedRecords = __spreadArray(__spreadArray([], allRecords, true), data.records, true);
                        if (!data.done && data.nextRecordsUrl) {
                            return [2 /*return*/, fetchSalesforceData(token, "".concat(salesforceConfig.apiUrl).concat(data.nextRecordsUrl), combinedRecords)];
                        }
                        return [2 /*return*/, combinedRecords];
                }
            });
        });
    };
    var handleGetCount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, query, url, response, data, count, err_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!objectApiName) {
                        setStatusMessage("Please enter an Object API Name.");
                        return [2 /*return*/];
                    }
                    setStatusMessage("Fetching total record count...");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getSalesforceToken()];
                case 2:
                    token = _d.sent();
                    query = "SELECT count() FROM ".concat(objectApiName);
                    url = "".concat(salesforceConfig.apiUrl, "/services/data/v66.0/query/?q=").concat(encodeURIComponent(query));
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: { 'Authorization': "Bearer ".concat(token), 'Content-Type': 'application/json' }
                        })];
                case 3:
                    response = _d.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch count: ".concat(response.statusText));
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _d.sent();
                    count = (_c = (_a = data.totalSize) !== null && _a !== void 0 ? _a : (_b = data.records) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
                    setTotalCount(count);
                    setStatusMessage("Total records for ".concat(objectApiName, ": ").concat(count));
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _d.sent();
                    console.error(err_1);
                    setStatusMessage("Error fetching count: ".concat(err_1.message || err_1));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleAnalysis = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, describeUrl, describeRes, describeData, fieldNames, query, url, allRecords_1, firstRecord, keys, mappings_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!objectApiName) {
                        setStatusMessage("Please enter an Object API Name.");
                        return [2 /*return*/];
                    }
                    setIsAnalyzing(true);
                    setStatusMessage("Analyzing object...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, getSalesforceToken()];
                case 2:
                    token = _a.sent();
                    setStatusMessage("Fetching object metadata...");
                    describeUrl = "".concat(salesforceConfig.apiUrl, "/services/data/v66.0/sobjects/").concat(objectApiName, "/describe");
                    return [4 /*yield*/, fetch(describeUrl, {
                            headers: { 'Authorization': "Bearer ".concat(token) }
                        })];
                case 3:
                    describeRes = _a.sent();
                    if (!describeRes.ok)
                        throw new Error("Failed to fetch object metadata: ".concat(describeRes.statusText));
                    return [4 /*yield*/, describeRes.json()];
                case 4:
                    describeData = _a.sent();
                    fieldNames = describeData.fields.map(function (f) { return f.name; });
                    setStatusMessage("Fetching all records...");
                    query = "SELECT ".concat(fieldNames.join(','), " FROM ").concat(objectApiName, " ORDER BY CreatedDate DESC LIMIT 200");
                    url = "".concat(salesforceConfig.apiUrl, "/services/data/v66.0/query/?q=").concat(encodeURIComponent(query));
                    return [4 /*yield*/, fetchSalesforceData(token, url)];
                case 5:
                    allRecords_1 = _a.sent();
                    setRecords(allRecords_1);
                    if (allRecords_1.length > 0) {
                        firstRecord = allRecords_1[0];
                        keys = Object.keys(firstRecord).filter(function (k) { return k !== 'attributes'; });
                        mappings_1 = [];
                        keys.forEach(function (key) {
                            var maxLength = 0;
                            allRecords_1.forEach(function (r) {
                                var val = r[key];
                                if (val !== null && val !== undefined) {
                                    var strVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
                                    if (strVal.length > maxLength) {
                                        maxLength = strVal.length;
                                    }
                                }
                            });
                            var spType = maxLength > 255 ? 'MultilineText' : 'Text';
                            if (key.toLowerCase() === 'id') {
                                mappings_1.push({ sfColumn: key, spColumn: "".concat(objectApiName.replace(/__c$/, ''), "_id"), spType: 'Text' });
                            }
                            else if (key.indexOf('Simpplr') === 0) {
                                mappings_1.push({ sfColumn: key, spColumn: key, spType: spType });
                            }
                        });
                        setColumnMappings(mappings_1);
                        setListName("".concat(objectApiName, "_Migration"));
                        setStatusMessage("Analysis complete. Found ".concat(allRecords_1.length, " records."));
                    }
                    else {
                        setStatusMessage("No records found in Salesforce for this object.");
                    }
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error(error_1);
                    setStatusMessage("Error during analysis: ".concat(error_1.message || error_1));
                    return [3 /*break*/, 8];
                case 7:
                    setIsAnalyzing(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleColumnNameChange = function (sfColumn, newSpColumn) {
        setColumnMappings(function (prev) {
            return prev.map(function (m) { return m.sfColumn === sfColumn ? __assign(__assign({}, m), { spColumn: newSpColumn }) : m; });
        });
    };
    var handleCreateAndMigrate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var listEnsureResult, list, auditListName, auditListEnsureResult, auditList, e_1, e_2, e_3, auditView, e_4, e_5, e_6, spFieldInternalNames, _i, columnMappings_1, mapping, fieldResult, fieldErr_1, existingField, view, _a, columnMappings_2, mapping, viewErr_1, errorCount, successCount, i, record, itemPayload, _b, columnMappings_3, mapping, internalName, sfVal, itemErr_1, auditErr_1, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!listName) {
                        setStatusMessage("Please provide a list name.");
                        return [2 /*return*/];
                    }
                    setIsMigrating(true);
                    setStatusMessage("Creating SharePoint List...");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 50, 51, 52]);
                    return [4 /*yield*/, sp.web.lists.ensure(listName)];
                case 2:
                    listEnsureResult = _c.sent();
                    list = listEnsureResult.list;
                    // 1.5 Create Audit Log List
                    setStatusMessage("Creating Audit Log List...");
                    auditListName = "SalesforceMigration_AuditLog";
                    return [4 /*yield*/, sp.web.lists.ensure(auditListName)];
                case 3:
                    auditListEnsureResult = _c.sent();
                    auditList = auditListEnsureResult.list;
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, auditList.fields.addText("SalesforceId", { MaxLength: 255 })];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _c.sent();
                    return [3 /*break*/, 7];
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, auditList.fields.addText("ObjectName", { MaxLength: 255 })];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 10];
                case 9:
                    e_2 = _c.sent();
                    return [3 /*break*/, 10];
                case 10:
                    _c.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, auditList.fields.addMultilineText("ErrorMessage")];
                case 11:
                    _c.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_3 = _c.sent();
                    return [3 /*break*/, 13];
                case 13:
                    auditView = auditList.defaultView;
                    _c.label = 14;
                case 14:
                    _c.trys.push([14, 16, , 17]);
                    return [4 /*yield*/, auditView.fields.add("SalesforceId")];
                case 15:
                    _c.sent();
                    return [3 /*break*/, 17];
                case 16:
                    e_4 = _c.sent();
                    return [3 /*break*/, 17];
                case 17:
                    _c.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, auditView.fields.add("ObjectName")];
                case 18:
                    _c.sent();
                    return [3 /*break*/, 20];
                case 19:
                    e_5 = _c.sent();
                    return [3 /*break*/, 20];
                case 20:
                    _c.trys.push([20, 22, , 23]);
                    return [4 /*yield*/, auditView.fields.add("ErrorMessage")];
                case 21:
                    _c.sent();
                    return [3 /*break*/, 23];
                case 22:
                    e_6 = _c.sent();
                    return [3 /*break*/, 23];
                case 23:
                    // 2. Add Columns
                    setStatusMessage("Adding columns to SharePoint List...");
                    spFieldInternalNames = {};
                    _i = 0, columnMappings_1 = columnMappings;
                    _c.label = 24;
                case 24:
                    if (!(_i < columnMappings_1.length)) return [3 /*break*/, 33];
                    mapping = columnMappings_1[_i];
                    if (!(mapping.spColumn.toLowerCase() !== 'title')) return [3 /*break*/, 32];
                    _c.label = 25;
                case 25:
                    _c.trys.push([25, 30, , 32]);
                    fieldResult = void 0;
                    if (!(mapping.spType === 'MultilineText')) return [3 /*break*/, 27];
                    return [4 /*yield*/, list.fields.addMultilineText(mapping.spColumn, { NumberOfLines: 6, RichText: false, RestrictedMode: true, AppendOnly: false, AllowHyperlink: false })];
                case 26:
                    fieldResult = _c.sent();
                    return [3 /*break*/, 29];
                case 27: return [4 /*yield*/, list.fields.addText(mapping.spColumn, { MaxLength: 255 })];
                case 28:
                    fieldResult = _c.sent();
                    _c.label = 29;
                case 29:
                    spFieldInternalNames[mapping.spColumn] = fieldResult.EntityPropertyName || (fieldResult.data ? fieldResult.data.EntityPropertyName : mapping.spColumn);
                    return [3 /*break*/, 32];
                case 30:
                    fieldErr_1 = _c.sent();
                    console.warn("Field ".concat(mapping.spColumn, " might already exist or error:"), fieldErr_1);
                    return [4 /*yield*/, list.fields.getByTitle(mapping.spColumn)()];
                case 31:
                    existingField = _c.sent();
                    spFieldInternalNames[mapping.spColumn] = existingField.EntityPropertyName;
                    return [3 /*break*/, 32];
                case 32:
                    _i++;
                    return [3 /*break*/, 24];
                case 33:
                    view = list.defaultView;
                    _a = 0, columnMappings_2 = columnMappings;
                    _c.label = 34;
                case 34:
                    if (!(_a < columnMappings_2.length)) return [3 /*break*/, 39];
                    mapping = columnMappings_2[_a];
                    if (!(mapping.spColumn.toLowerCase() !== 'title')) return [3 /*break*/, 38];
                    _c.label = 35;
                case 35:
                    _c.trys.push([35, 37, , 38]);
                    return [4 /*yield*/, view.fields.add(spFieldInternalNames[mapping.spColumn] || mapping.spColumn)];
                case 36:
                    _c.sent();
                    return [3 /*break*/, 38];
                case 37:
                    viewErr_1 = _c.sent();
                    return [3 /*break*/, 38];
                case 38:
                    _a++;
                    return [3 /*break*/, 34];
                case 39:
                    // 3. Migrate Data
                    setStatusMessage("Migrating data...");
                    errorCount = 0;
                    successCount = 0;
                    i = 0;
                    _c.label = 40;
                case 40:
                    if (!(i < records.length)) return [3 /*break*/, 49];
                    record = records[i];
                    itemPayload = {};
                    // Default Title field as SharePoint lists require it if not hidden/optional
                    itemPayload.Title = record.Name || record.Id || "Item ".concat(i);
                    for (_b = 0, columnMappings_3 = columnMappings; _b < columnMappings_3.length; _b++) {
                        mapping = columnMappings_3[_b];
                        if (mapping.spColumn.toLowerCase() !== 'title') {
                            internalName = spFieldInternalNames[mapping.spColumn];
                            if (internalName) {
                                sfVal = record[mapping.sfColumn];
                                itemPayload[internalName] = sfVal ? (typeof sfVal === 'object' ? JSON.stringify(sfVal) : String(sfVal)) : null;
                            }
                        }
                    }
                    _c.label = 41;
                case 41:
                    _c.trys.push([41, 43, , 48]);
                    return [4 /*yield*/, list.items.add(itemPayload)];
                case 42:
                    _c.sent();
                    successCount++;
                    return [3 /*break*/, 48];
                case 43:
                    itemErr_1 = _c.sent();
                    console.error("Failed to migrate record ".concat(record.Id), itemErr_1);
                    errorCount++;
                    _c.label = 44;
                case 44:
                    _c.trys.push([44, 46, , 47]);
                    return [4 /*yield*/, auditList.items.add({
                            Title: "Error - ".concat(record.Id),
                            SalesforceId: record.Id,
                            ObjectName: objectApiName,
                            ErrorMessage: String(itemErr_1.message || itemErr_1)
                        })];
                case 45:
                    _c.sent();
                    return [3 /*break*/, 47];
                case 46:
                    auditErr_1 = _c.sent();
                    console.error("Failed to write to audit log", auditErr_1);
                    return [3 /*break*/, 47];
                case 47:
                    if (errorCount > 5) {
                        throw new Error("Migration stopped: More than 5 items failed to migrate. Please check the Audit Log (".concat(auditListName, ") for details."));
                    }
                    return [3 /*break*/, 48];
                case 48:
                    i++;
                    return [3 /*break*/, 40];
                case 49:
                    setStatusMessage("Migration complete! Successfully migrated ".concat(successCount, " records. ").concat(errorCount, " failures logged to ").concat(auditListName, "."));
                    return [3 /*break*/, 52];
                case 50:
                    error_2 = _c.sent();
                    console.error(error_2);
                    setStatusMessage("Error during migration: ".concat(error_2.message || error_2));
                    return [3 /*break*/, 52];
                case 51:
                    setIsMigrating(false);
                    return [7 /*endfinally*/];
                case 52: return [2 /*return*/];
            }
        });
    }); };
    var columns = [
        {
            key: 'sfColumn',
            name: 'Salesforce Column',
            fieldName: 'sfColumn',
            minWidth: 150,
            maxWidth: 250,
            isResizable: true
        },
        {
            key: 'spColumn',
            name: 'SharePoint Column (Editable)',
            fieldName: 'spColumn',
            minWidth: 150,
            maxWidth: 250,
            isResizable: true,
            onRender: function (item) { return (React.createElement(TextField, { value: item.spColumn, onChange: function (e, val) { return handleColumnNameChange(item.sfColumn, val || ''); } })); }
        }
    ];
    return (React.createElement("div", { style: { padding: '20px', fontFamily: 'Segoe UI, sans-serif' } },
        React.createElement("h2", null, "Salesforce to SharePoint Migration"),
        React.createElement("div", { style: { display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '20px' } },
            React.createElement(TextField, { label: "Salesforce Object API Name", value: objectApiName, onChange: function (e, val) { return setObjectApiName(val || ''); }, disabled: isAnalyzing || isMigrating }),
            React.createElement(PrimaryButton, { text: "Get Total Count", onClick: handleGetCount, disabled: !objectApiName || isAnalyzing || isMigrating }),
            React.createElement(PrimaryButton, { text: "Analysis", onClick: handleAnalysis, disabled: !objectApiName || isAnalyzing || isMigrating })),
        statusMessage && (React.createElement("div", { style: { margin: '10px 0', padding: '10px', backgroundColor: '#f3f2f1' } }, statusMessage)),
        totalCount !== null && (React.createElement("div", { style: { margin: '10px 0', padding: '10px', backgroundColor: '#e0f7fa' } },
            "Total records: ",
            totalCount)),
        columnMappings.length > 0 && (React.createElement("div", { style: { marginTop: '20px' } },
            React.createElement(TextField, { label: "Suggested SharePoint List Name", value: listName, onChange: function (e, val) { return setListName(val || ''); }, disabled: isMigrating, style: { marginBottom: '20px' } }),
            React.createElement(DetailsList, { items: columnMappings, columns: columns, setKey: "set", layoutMode: DetailsListLayoutMode.justified, selectionMode: SelectionMode.none }),
            React.createElement("div", { style: { marginTop: '20px' } },
                React.createElement(PrimaryButton, { text: "Create List & Migrate Data", onClick: handleCreateAndMigrate, disabled: isMigrating || columnMappings.length === 0 }))))));
};
//# sourceMappingURL=SalesforceMigration.js.map