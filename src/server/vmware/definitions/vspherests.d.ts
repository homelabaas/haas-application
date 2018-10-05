declare module vspherests {
       interface stsService {
      addHandler(handler: Function): void;
      removeHandler(handler: Function): void;
      serializeObject(obj: Object, name: string): Node;
      deserializeObject(obj: Node): Object;
      xs: {
         AnyType: {
            (options?: stsService.xs.AnyType): stsService.xs.AnyType;
         };
         AnyURI: {
            (options?: stsService.xs.AnyURI): stsService.xs.AnyURI;
         };
         Base64Binary: {
            (options?: stsService.xs.Base64Binary): stsService.xs.Base64Binary;
         };
         Boolean: {
            (options?: stsService.xs.Boolean): stsService.xs.Boolean;
         };
         Byte: {
            (options?: stsService.xs.Byte): stsService.xs.Byte;
         };
         DateTime: {
            (options?: stsService.xs.DateTime): stsService.xs.DateTime;
         };
         Double: {
            (options?: stsService.xs.Double): stsService.xs.Double;
         };
         Float: {
            (options?: stsService.xs.Float): stsService.xs.Float;
         };
         ID: {
            (options?: stsService.xs.ID): stsService.xs.ID;
         };
         Int: {
            (options?: stsService.xs.Int): stsService.xs.Int;
         };
         Integer: {
            (options?: stsService.xs.Integer): stsService.xs.Integer;
         };
         Long: {
            (options?: stsService.xs.Long): stsService.xs.Long;
         };
         NCName: {
            (options?: stsService.xs.NCName): stsService.xs.NCName;
         };
         NegativeInteger: {
            (options?: stsService.xs.NegativeInteger): stsService.xs.NegativeInteger;
         };
         NonNegativeInteger: {
            (options?: stsService.xs.NonNegativeInteger): stsService.xs.NonNegativeInteger;
         };
         NonPositiveInteger: {
            (options?: stsService.xs.NonPositiveInteger): stsService.xs.NonPositiveInteger;
         };
         PositiveInteger: {
            (options?: stsService.xs.PositiveInteger): stsService.xs.PositiveInteger;
         };
         QName: {
            (options?: stsService.xs.QName): stsService.xs.QName;
         };
         Short: {
            (options?: stsService.xs.Short): stsService.xs.Short;
         };
         String: {
            (options?: stsService.xs.String): stsService.xs.String;
         };
         UnsignedLong: {
            (options?: stsService.xs.UnsignedLong): stsService.xs.UnsignedLong;
         };
      }
      stsPort: {
         challenge(requestSecurityTokenResponse: stsService.wst13.RequestSecurityTokenResponseType): Promise<stsService.wst13.RequestSecurityTokenResponseCollectionType>;
         issue(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseCollectionType>;
         renew(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseType>;
         validate(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseType>;
      }
      smlp: {
         NameIDFormats: {
            "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName": string;
            "http://schemas.xmlsoap.org/claims/UPN": string;
            "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent": string;
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
            "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified": string;
            "urn:oasis:names:tc:SAML:2.0:nameid-format:entity": string;
         };
         AttributeNameFormats: {
            "urn:oasis:names:tc:SAML:2.0:attrname-format:uri": string;
            "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified": string;
            "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified": string;
         };
         UUID: {
            (options?: stsService.smlp.UUID): stsService.smlp.UUID;
         };
         UTCTime: {
            (options?: stsService.smlp.UTCTime): stsService.smlp.UTCTime;
         };
         SubjectConfirmationMethods: {
            "urn:oasis:names:tc:SAML:2.0:cm:bearer": string;
            "urn:oasis:names:tc:SAML:2.0:cm:holder-of-key": string;
         };
         AuthnContextClassRefs: {
            "urn:oasis:names:tc:SAML:2.0:ac:classes:Kerberos": string;
            "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport": string;
            "urn:oasis:names:tc:SAML:2.0:ac:classes:XMLDSig": string;
            "urn:oasis:names:tc:SAML:2.0:ac:classes:PreviousSession": string;
            "urn:federation:authentication:windows": string;
         };
         AttributeNames: {
            "http://rsa.com/schemas/attr-names/2009/01/GroupIdentity": string;
            "http://vmware.com/schemas/attr-names/2011/07/isSolution": string;
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
         };
      }
      smle: {
         RSAAdviceType: {
            (options?: stsService.smle.RSAAdviceType): stsService.smle.RSAAdviceType;
         };
         RenewRestrictionType: {
            (options?: stsService.smle.RenewRestrictionType): stsService.smle.RenewRestrictionType;
         };
      }
      del: {
         DelegationRestrictionType: {
            (options?: stsService.del.DelegationRestrictionType): stsService.del.DelegationRestrictionType;
         };
         DelegateType: {
            (options?: stsService.del.DelegateType): stsService.del.DelegateType;
         };
      }
      wsu: {
         TTimestampFault: {
            "wsu:MessageExpired": string;
         };
         AttributedDateTime: {
            (options?: stsService.wsu.AttributedDateTime): stsService.wsu.AttributedDateTime;
         };
         AttributedURI: {
            (options?: stsService.wsu.AttributedURI): stsService.wsu.AttributedURI;
         };
         TimestampType: {
            (options?: stsService.wsu.TimestampType): stsService.wsu.TimestampType;
         };
      }
      wsta: {
         AdviceSetType: {
            (options?: stsService.wsta.AdviceSetType): stsService.wsta.AdviceSetType;
         };
         AdviceType: {
            (options?: stsService.wsta.AdviceType): stsService.wsta.AdviceType;
         };
         AttributeType: {
            (options?: stsService.wsta.AttributeType): stsService.wsta.AttributeType;
         };
      }
      wsa: {
         EndpointReferenceType: {
            (options?: stsService.wsa.EndpointReferenceType): stsService.wsa.EndpointReferenceType;
         };
         ReferenceParametersType: {
            (options?: stsService.wsa.ReferenceParametersType): stsService.wsa.ReferenceParametersType;
         };
         MetadataType: {
            (options?: stsService.wsa.MetadataType): stsService.wsa.MetadataType;
         };
         RelatesToType: {
            (options?: stsService.wsa.RelatesToType): stsService.wsa.RelatesToType;
         };
         RelationshipTypeOpenEnum: {
            (options?: stsService.wsa.RelationshipTypeOpenEnum): stsService.wsa.RelationshipTypeOpenEnum;
         };
         RelationshipType: {
            "http://www.w3.org/2005/08/addressing/reply": string;
         };
         AttributedURIType: {
            (options?: stsService.wsa.AttributedURIType): stsService.wsa.AttributedURIType;
         };
         FaultCodesOpenEnumType: {
            (options?: stsService.wsa.FaultCodesOpenEnumType): stsService.wsa.FaultCodesOpenEnumType;
         };
         FaultCodesType: {
            "tns:InvalidAddressingHeader": string;
            "tns:InvalidAddress": string;
            "tns:InvalidEPR": string;
            "tns:InvalidCardinality": string;
            "tns:MissingAddressInEPR": string;
            "tns:DuplicateMessageID": string;
            "tns:ActionMismatch": string;
            "tns:MessageAddressingHeaderRequired": string;
            "tns:DestinationUnreachable": string;
            "tns:ActionNotSupported": string;
            "tns:EndpointUnavailable": string;
         };
         AttributedUnsignedLongType: {
            (options?: stsService.wsa.AttributedUnsignedLongType): stsService.wsa.AttributedUnsignedLongType;
         };
         AttributedQNameType: {
            (options?: stsService.wsa.AttributedQNameType): stsService.wsa.AttributedQNameType;
         };
         ProblemActionType: {
            (options?: stsService.wsa.ProblemActionType): stsService.wsa.ProblemActionType;
         };
      }
      dsig: {
         CryptoBinary: {
            (options?: stsService.dsig.CryptoBinary): stsService.dsig.CryptoBinary;
         };
         SignatureType: {
            (options?: stsService.dsig.SignatureType): stsService.dsig.SignatureType;
         };
         SignatureValueType: {
            (options?: stsService.dsig.SignatureValueType): stsService.dsig.SignatureValueType;
         };
         SignedInfoType: {
            (options?: stsService.dsig.SignedInfoType): stsService.dsig.SignedInfoType;
         };
         CanonicalizationMethodType: {
            (options?: stsService.dsig.CanonicalizationMethodType): stsService.dsig.CanonicalizationMethodType;
         };
         SignatureMethodType: {
            (options?: stsService.dsig.SignatureMethodType): stsService.dsig.SignatureMethodType;
         };
         ReferenceType: {
            (options?: stsService.dsig.ReferenceType): stsService.dsig.ReferenceType;
         };
         TransformsType: {
            (options?: stsService.dsig.TransformsType): stsService.dsig.TransformsType;
         };
         TransformType: {
            (options?: stsService.dsig.TransformType): stsService.dsig.TransformType;
         };
         DigestMethodType: {
            (options?: stsService.dsig.DigestMethodType): stsService.dsig.DigestMethodType;
         };
         DigestValueType: {
            (options?: stsService.dsig.DigestValueType): stsService.dsig.DigestValueType;
         };
         KeyInfoType: {
            (options?: stsService.dsig.KeyInfoType): stsService.dsig.KeyInfoType;
         };
         KeyValueType: {
            (options?: stsService.dsig.KeyValueType): stsService.dsig.KeyValueType;
         };
         RetrievalMethodType: {
            (options?: stsService.dsig.RetrievalMethodType): stsService.dsig.RetrievalMethodType;
         };
         X509DataType: {
            (options?: stsService.dsig.X509DataType): stsService.dsig.X509DataType;
         };
         X509IssuerSerialType: {
            (options?: stsService.dsig.X509IssuerSerialType): stsService.dsig.X509IssuerSerialType;
         };
         PGPDataType: {
            (options?: stsService.dsig.PGPDataType): stsService.dsig.PGPDataType;
         };
         SPKIDataType: {
            (options?: stsService.dsig.SPKIDataType): stsService.dsig.SPKIDataType;
         };
         ObjectType: {
            (options?: stsService.dsig.ObjectType): stsService.dsig.ObjectType;
         };
         ManifestType: {
            (options?: stsService.dsig.ManifestType): stsService.dsig.ManifestType;
         };
         SignaturePropertiesType: {
            (options?: stsService.dsig.SignaturePropertiesType): stsService.dsig.SignaturePropertiesType;
         };
         SignaturePropertyType: {
            (options?: stsService.dsig.SignaturePropertyType): stsService.dsig.SignaturePropertyType;
         };
         HMACOutputLengthType: {
            (options?: stsService.dsig.HMACOutputLengthType): stsService.dsig.HMACOutputLengthType;
         };
         DSAKeyValueType: {
            (options?: stsService.dsig.DSAKeyValueType): stsService.dsig.DSAKeyValueType;
         };
         RSAKeyValueType: {
            (options?: stsService.dsig.RSAKeyValueType): stsService.dsig.RSAKeyValueType;
         };
      }
      saml: {
         NameIDType: {
            (options?: stsService.saml.NameIDType): stsService.saml.NameIDType;
         };
         AssertionType: {
            (options?: stsService.saml.AssertionType): stsService.saml.AssertionType;
         };
         SubjectType: {
            (options?: stsService.saml.SubjectType): stsService.saml.SubjectType;
         };
         SubjectConfirmationType: {
            (options?: stsService.saml.SubjectConfirmationType): stsService.saml.SubjectConfirmationType;
         };
         SubjectConfirmationDataType: {
            (options?: stsService.saml.SubjectConfirmationDataType): stsService.saml.SubjectConfirmationDataType;
         };
         KeyInfoConfirmationDataType: {
            (options?: stsService.saml.KeyInfoConfirmationDataType): stsService.saml.KeyInfoConfirmationDataType;
         };
         ConditionsType: {
            (options?: stsService.saml.ConditionsType): stsService.saml.ConditionsType;
         };
         ConditionAbstractType: {
            (options?: stsService.saml.ConditionAbstractType): stsService.saml.ConditionAbstractType;
         };
         AudienceRestrictionType: {
            (options?: stsService.saml.AudienceRestrictionType): stsService.saml.AudienceRestrictionType;
         };
         OneTimeUseType: {
            (options?: stsService.saml.OneTimeUseType): stsService.saml.OneTimeUseType;
         };
         ProxyRestrictionType: {
            (options?: stsService.saml.ProxyRestrictionType): stsService.saml.ProxyRestrictionType;
         };
         AdviceType: {
            (options?: stsService.saml.AdviceType): stsService.saml.AdviceType;
         };
         StatementAbstractType: {
            (options?: stsService.saml.StatementAbstractType): stsService.saml.StatementAbstractType;
         };
         AuthnStatementType: {
            (options?: stsService.saml.AuthnStatementType): stsService.saml.AuthnStatementType;
         };
         AuthnContextType: {
            (options?: stsService.saml.AuthnContextType): stsService.saml.AuthnContextType;
         };
         AttributeStatementType: {
            (options?: stsService.saml.AttributeStatementType): stsService.saml.AttributeStatementType;
         };
         AttributeType: {
            (options?: stsService.saml.AttributeType): stsService.saml.AttributeType;
         };
      }
      wsse: {
         SecurityHeaderType: {
            (options?: stsService.wsse.SecurityHeaderType): stsService.wsse.SecurityHeaderType;
         };
         UsernameTokenType: {
            (options?: stsService.wsse.UsernameTokenType): stsService.wsse.UsernameTokenType;
         };
         AttributedString: {
            (options?: stsService.wsse.AttributedString): stsService.wsse.AttributedString;
         };
         PasswordString: {
            (options?: stsService.wsse.PasswordString): stsService.wsse.PasswordString;
         };
         BinarySecurityTokenType: {
            (options?: stsService.wsse.BinarySecurityTokenType): stsService.wsse.BinarySecurityTokenType;
         };
         EncodedString: {
            (options?: stsService.wsse.EncodedString): stsService.wsse.EncodedString;
         };
         KeyIdentifierType: {
            (options?: stsService.wsse.KeyIdentifierType): stsService.wsse.KeyIdentifierType;
         };
         ReferenceType: {
            (options?: stsService.wsse.ReferenceType): stsService.wsse.ReferenceType;
         };
         SecurityTokenReferenceType: {
            (options?: stsService.wsse.SecurityTokenReferenceType): stsService.wsse.SecurityTokenReferenceType;
         };
      }
      wst14: {
         ActAsType: {
            (options?: stsService.wst14.ActAsType): stsService.wst14.ActAsType;
         };
      }
      wst13: {
         RequestSecurityTokenType: {
            (options?: stsService.wst13.RequestSecurityTokenType): stsService.wst13.RequestSecurityTokenType;
         };
         RequestTypeOpenEnum: {
            (options?: stsService.wst13.RequestTypeOpenEnum): stsService.wst13.RequestTypeOpenEnum;
         };
         RequestTypeEnum: {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue": string;
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Renew": string;
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Cancel": string;
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Validate": string;
         };
         RequestSecurityTokenResponseType: {
            (options?: stsService.wst13.RequestSecurityTokenResponseType): stsService.wst13.RequestSecurityTokenResponseType;
         };
         RequestedSecurityTokenType: {
            (options?: stsService.wst13.RequestedSecurityTokenType): stsService.wst13.RequestedSecurityTokenType;
         };
         LifetimeType: {
            (options?: stsService.wst13.LifetimeType): stsService.wst13.LifetimeType;
         };
         RequestSecurityTokenResponseCollectionType: {
            (options?: stsService.wst13.RequestSecurityTokenResponseCollectionType): stsService.wst13.RequestSecurityTokenResponseCollectionType;
         };
         RenewTargetType: {
            (options?: stsService.wst13.RenewTargetType): stsService.wst13.RenewTargetType;
         };
         RenewingType: {
            (options?: stsService.wst13.RenewingType): stsService.wst13.RenewingType;
         };
         ValidateTargetType: {
            (options?: stsService.wst13.ValidateTargetType): stsService.wst13.ValidateTargetType;
         };
         StatusType: {
            (options?: stsService.wst13.StatusType): stsService.wst13.StatusType;
         };
         StatusCodeEnum: {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/status/valid": string;
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/status/invalid": string;
         };
         StatusCodeOpenEnum: {
            (options?: stsService.wst13.StatusCodeOpenEnum): stsService.wst13.StatusCodeOpenEnum;
         };
         BinaryExchangeType: {
            (options?: stsService.wst13.BinaryExchangeType): stsService.wst13.BinaryExchangeType;
         };
         KeyTypeEnum: {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/PublicKey": string;
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer": string;
         };
         KeyTypeOpenEnum: {
            (options?: stsService.wst13.KeyTypeOpenEnum): stsService.wst13.KeyTypeOpenEnum;
         };
         UseKeyType: {
            (options?: stsService.wst13.UseKeyType): stsService.wst13.UseKeyType;
         };
         DelegateToType: {
            (options?: stsService.wst13.DelegateToType): stsService.wst13.DelegateToType;
         };
         ParticipantsType: {
            (options?: stsService.wst13.ParticipantsType): stsService.wst13.ParticipantsType;
         };
         ParticipantType: {
            (options?: stsService.wst13.ParticipantType): stsService.wst13.ParticipantType;
         };
      }
   }
   namespace stsService {
      interface xs {
      }
      namespace xs {
         interface AnyType {
            value: string;
         }
         interface AnyURI {
            value: string;
         }
         interface Base64Binary {
            value: string;
         }
         interface Boolean {
            value: string;
         }
         interface Byte {
            value: string;
         }
         interface DateTime {
            value: string;
         }
         interface Double {
            value: string;
         }
         interface Float {
            value: string;
         }
         interface ID {
            value: string;
         }
         interface Int {
            value: string;
         }
         interface Integer {
            value: string;
         }
         interface Long {
            value: string;
         }
         interface NCName {
            value: string;
         }
         interface NegativeInteger {
            value: string;
         }
         interface NonNegativeInteger {
            value: string;
         }
         interface NonPositiveInteger {
            value: string;
         }
         interface PositiveInteger {
            value: string;
         }
         interface QName {
            value: string;
         }
         interface Short {
            value: string;
         }
         interface String {
            value: string;
         }
         interface UnsignedLong {
            value: string;
         }
      }
      interface stsPort {
         challenge(requestSecurityTokenResponse: stsService.wst13.RequestSecurityTokenResponseType): Promise<stsService.wst13.RequestSecurityTokenResponseCollectionType>;
         issue(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseCollectionType>;
         renew(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseType>;
         validate(requestSecurityToken: stsService.wst13.RequestSecurityTokenType): Promise<stsService.wst13.RequestSecurityTokenResponseType>;
      }
      namespace stsPort {
      }
      interface smlp {
      }
      namespace smlp {
         enum NameIDFormats {
            "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
            "http://schemas.xmlsoap.org/claims/UPN",
            "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
            "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "urn:oasis:names:tc:SAML:2.0:nameid-format:entity",
         }
         enum AttributeNameFormats {
            "urn:oasis:names:tc:SAML:2.0:attrname-format:uri",
            "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
         }
         interface UUID {
         }
         interface UTCTime {
         }
         enum SubjectConfirmationMethods {
            "urn:oasis:names:tc:SAML:2.0:cm:bearer",
            "urn:oasis:names:tc:SAML:2.0:cm:holder-of-key",
         }
         enum AuthnContextClassRefs {
            "urn:oasis:names:tc:SAML:2.0:ac:classes:Kerberos",
            "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
            "urn:oasis:names:tc:SAML:2.0:ac:classes:XMLDSig",
            "urn:oasis:names:tc:SAML:2.0:ac:classes:PreviousSession",
            "urn:federation:authentication:windows",
         }
         enum AttributeNames {
            "http://rsa.com/schemas/attr-names/2009/01/GroupIdentity",
            "http://vmware.com/schemas/attr-names/2011/07/isSolution",
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
         }
      }
      interface smle {
      }
      namespace smle {
         interface RSAAdviceType {
            AdviceSource: string;
            Attribute: Array<stsService.saml.AttributeType>;
         }
         interface RenewRestrictionType extends stsService.saml.ConditionAbstractType {
            Count: number;
            Postdatable: boolean;
            RenewExpired: boolean;
         }
      }
      interface del {
      }
      namespace del {
         interface DelegationRestrictionType extends stsService.saml.ConditionAbstractType {
            Delegate: Array<stsService.del.DelegateType>;
         }
         interface DelegateType {
            DelegationInstant: Date;
            NameID: stsService.saml.NameIDType;
         }
      }
      interface wsu {
      }
      namespace wsu {
         enum TTimestampFault {
            "wsu:MessageExpired",
         }
         interface AttributedDateTime extends stsService.xs.String {
            Id?: string;
            value: string;
         }
         interface AttributedURI extends stsService.xs.AnyURI {
            Id: string;
            value: string;
         }
         interface TimestampType {
            Id?: string;
            Created: stsService.wsu.AttributedDateTime;
            Expires: stsService.wsu.AttributedDateTime;
         }
      }
      interface wsta {
      }
      namespace wsta {
         interface AdviceSetType {
            Advice: Array<stsService.wsta.AdviceType>;
         }
         interface AdviceType {
            AdviceSource: string;
            Attribute: Array<stsService.wsta.AttributeType>;
         }
         interface AttributeType {
            Name: string;
            FriendlyName: string;
            AttributeValue?: Array<any>;
         }
      }
      interface wsa {
      }
      namespace wsa {
         interface EndpointReferenceType {
            Address: stsService.wsa.AttributedURIType;
            ReferenceParameters?: stsService.wsa.ReferenceParametersType;
            Metadata?: stsService.wsa.MetadataType;
         }
         interface ReferenceParametersType {
         }
         interface MetadataType {
         }
         interface RelatesToType extends stsService.xs.AnyURI {
            RelationshipType: stsService.wsa.RelationshipTypeOpenEnum;
            value: string;
         }
         interface RelationshipTypeOpenEnum {
         }
         enum RelationshipType {
            "http://www.w3.org/2005/08/addressing/reply",
         }
         interface AttributedURIType extends stsService.xs.AnyURI {
            value: string;
         }
         interface FaultCodesOpenEnumType {
         }
         enum FaultCodesType {
            "tns:InvalidAddressingHeader",
            "tns:InvalidAddress",
            "tns:InvalidEPR",
            "tns:InvalidCardinality",
            "tns:MissingAddressInEPR",
            "tns:DuplicateMessageID",
            "tns:ActionMismatch",
            "tns:MessageAddressingHeaderRequired",
            "tns:DestinationUnreachable",
            "tns:ActionNotSupported",
            "tns:EndpointUnavailable",
         }
         interface AttributedUnsignedLongType extends stsService.xs.UnsignedLong {
            value: string;
         }
         interface AttributedQNameType extends stsService.xs.QName {
            value: string;
         }
         interface ProblemActionType {
            Action?: stsService.wsa.AttributedURIType;
            SoapAction?: string;
         }
      }
      interface dsig {
      }
      namespace dsig {
         interface CryptoBinary {
         }
         interface SignatureType {
            Id: string;
            SignedInfo: stsService.dsig.SignedInfoType;
            SignatureValue: stsService.dsig.SignatureValueType;
            KeyInfo?: stsService.dsig.KeyInfoType;
            Object?: Array<stsService.dsig.ObjectType>;
         }
         interface SignatureValueType extends stsService.xs.Base64Binary {
            Id: string;
            value: string;
         }
         interface SignedInfoType {
            Id: string;
            CanonicalizationMethod: stsService.dsig.CanonicalizationMethodType;
            SignatureMethod: stsService.dsig.SignatureMethodType;
            Reference: Array<stsService.dsig.ReferenceType>;
         }
         interface CanonicalizationMethodType {
            Algorithm: string;
         }
         interface SignatureMethodType {
            Algorithm: string;
            HMACOutputLength?: stsService.dsig.HMACOutputLengthType;
         }
         interface ReferenceType {
            Id: string;
            URI: string;
            Type: string;
            Transforms?: stsService.dsig.TransformsType;
            DigestMethod: stsService.dsig.DigestMethodType;
            DigestValue: stsService.dsig.DigestValueType;
         }
         interface TransformsType {
            Transform: Array<stsService.dsig.TransformType>;
         }
         interface TransformType {
         }
         interface DigestMethodType {
            Algorithm: string;
         }
         interface DigestValueType {
         }
         interface KeyInfoType {
         }
         interface KeyValueType {
            DSAKeyValue?: stsService.dsig.DSAKeyValueType;
            RSAKeyValue?: stsService.dsig.RSAKeyValueType;
         }
         interface RetrievalMethodType {
            URI: string;
            Type: string;
            Transforms?: stsService.dsig.TransformsType;
         }
         interface X509DataType {
         }
         interface X509IssuerSerialType {
            X509IssuerName: string;
            X509SerialNumber: number;
         }
         interface PGPDataType {
            PGPKeyID: string;
            PGPKeyPacket: string;
         }
         interface SPKIDataType {
         }
         interface ObjectType {
         }
         interface ManifestType {
            Id: string;
            Reference: Array<stsService.dsig.ReferenceType>;
         }
         interface SignaturePropertiesType {
            Id: string;
            SignatureProperty: Array<stsService.dsig.SignaturePropertyType>;
         }
         interface SignaturePropertyType {
         }
         interface HMACOutputLengthType {
         }
         interface DSAKeyValueType {
            P: stsService.dsig.CryptoBinary;
            Q: stsService.dsig.CryptoBinary;
            G?: stsService.dsig.CryptoBinary;
            Y: stsService.dsig.CryptoBinary;
            J?: stsService.dsig.CryptoBinary;
            Seed: stsService.dsig.CryptoBinary;
            PgenCounter: stsService.dsig.CryptoBinary;
         }
         interface RSAKeyValueType {
            Modulus: stsService.dsig.CryptoBinary;
            Exponent: stsService.dsig.CryptoBinary;
         }
      }
      interface saml {
      }
      namespace saml {
         interface NameIDType extends stsService.xs.String {
            NameQualifier: string;
            Format: stsService.smlp.NameIDFormats;
            value: string;
         }
         interface AssertionType {
         }
         interface SubjectType {
            NameID: stsService.saml.NameIDType;
            SubjectConfirmation: stsService.saml.SubjectConfirmationType;
         }
         interface SubjectConfirmationType {
            Method: stsService.smlp.SubjectConfirmationMethods;
            NameID?: stsService.saml.NameIDType;
            SubjectConfirmationData: stsService.saml.SubjectConfirmationDataType;
         }
         interface SubjectConfirmationDataType {
            NotOnOrAfter: stsService.smlp.UTCTime;
            Recipient: string;
            InResponseTo: string;
         }
         interface KeyInfoConfirmationDataType {
            KeyInfo: Array<stsService.dsig.KeyInfoType>;
         }
         interface ConditionsType {
         }
         interface ConditionAbstractType {
         }
         interface AudienceRestrictionType extends stsService.saml.ConditionAbstractType {
            Audience: Array<string>;
         }
         interface OneTimeUseType extends stsService.saml.ConditionAbstractType {
         }
         interface ProxyRestrictionType extends stsService.saml.ConditionAbstractType {
            Count: number;
         }
         interface AdviceType {
         }
         interface StatementAbstractType {
         }
         interface AuthnStatementType extends stsService.saml.StatementAbstractType {
            AuthnInstant: stsService.smlp.UTCTime;
            SessionIndex: string;
            SessionNotOnOrAfter: Date;
            AuthnContext: stsService.saml.AuthnContextType;
         }
         interface AuthnContextType {
            AuthnContextClassRef: string;
         }
         interface AttributeStatementType extends stsService.saml.StatementAbstractType {
         }
         interface AttributeType {
            Name: string;
            NameFormat: stsService.smlp.AttributeNameFormats;
            FriendlyName: string;
            AttributeValue?: Array<any>;
         }
      }
      interface wsse {
      }
      namespace wsse {
         interface SecurityHeaderType {
         }
         interface UsernameTokenType {
            Id?: string;
            Username: stsService.wsse.AttributedString;
            Password: PasswordString;
         }
         interface AttributedString extends stsService.xs.String {
            Id?: string;
            value: string;
         }
         interface PasswordString extends stsService.wsse.AttributedString {
            Type?: string;
         }
         interface BinarySecurityTokenType extends stsService.wsse.EncodedString {
            ValueType: string;
         }
         interface EncodedString extends stsService.wsse.AttributedString {
            EncodingType: string;
         }
         interface KeyIdentifierType extends stsService.wsse.EncodedString {
            ValueType: string;
         }
         interface ReferenceType {
            URI: string;
            ValueType: string;
         }
         interface SecurityTokenReferenceType {
         }
      }
      interface wst14 {
      }
      namespace wst14 {
         interface ActAsType {
            Assertion: stsService.saml.AssertionType;
         }
      }
      interface wst13 {
      }
      namespace wst13 {
         interface RequestSecurityTokenType {
            Context?: string;
            TokenType?: string;
            RequestType: stsService.wst13.RequestTypeOpenEnum;
            Lifetime?: stsService.wst13.LifetimeType;
            ValidateTarget?: stsService.wst13.ValidateTargetType;
            RenewTarget?: stsService.wst13.RenewTargetType;
            Renewing?: stsService.wst13.RenewingType;
            DelegateTo?: stsService.wst13.DelegateToType;
            Delegatable?: boolean;
            ActAs?: stsService.wst14.ActAsType;
            UseKey?: stsService.wst13.UseKeyType;
            KeyType?: stsService.wst13.KeyTypeOpenEnum;
            SignatureAlgorithm?: string;
            BinaryExchange?: stsService.wst13.BinaryExchangeType;
            Participants?: stsService.wst13.ParticipantsType;
            AdviceSet?: stsService.wsta.AdviceSetType;
         }
         interface RequestTypeOpenEnum {
         }
         enum RequestTypeEnum {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue",
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Renew",
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Cancel",
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Validate",
         }
         interface RequestSecurityTokenResponseType {
            Context: string;
            RequestedSecurityToken: stsService.wst13.RequestedSecurityTokenType;
            Lifetime: stsService.wst13.LifetimeType;
            TokenType: string;
            Status: stsService.wst13.StatusType;
            BinaryExchange: stsService.wst13.BinaryExchangeType;
            Renewing?: stsService.wst13.RenewingType;
            KeyType?: stsService.wst13.KeyTypeOpenEnum;
            Delegatable?: boolean;
            SignatureAlgorithm?: string;
            AdviceSet?: stsService.wsta.AdviceSetType;
         }
         interface RequestedSecurityTokenType {
            Assertion: stsService.saml.AssertionType;
         }
         interface LifetimeType {
            Created?: stsService.wsu.AttributedDateTime;
            Expires?: stsService.wsu.AttributedDateTime;
         }
         interface RequestSecurityTokenResponseCollectionType {
            RequestSecurityTokenResponse: stsService.wst13.RequestSecurityTokenResponseType;
         }
         interface RenewTargetType {
            Assertion: stsService.saml.AssertionType;
         }
         interface RenewingType {
            Allow: boolean;
            OK: boolean;
         }
         interface ValidateTargetType {
         }
         interface StatusType {
            Code: stsService.wst13.StatusCodeOpenEnum;
            Reason?: string;
         }
         enum StatusCodeEnum {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/status/valid",
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/status/invalid",
         }
         interface StatusCodeOpenEnum {
         }
         interface BinaryExchangeType extends stsService.xs.String {
            ValueType: string;
            EncodingType: string;
            value: string;
         }
         enum KeyTypeEnum {
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/PublicKey",
            "http://docs.oasis-open.org/ws-sx/ws-trust/200512/Bearer",
         }
         interface KeyTypeOpenEnum {
         }
         interface UseKeyType {
            Sig: string;
         }
         interface DelegateToType {
            UsernameToken: stsService.wsse.UsernameTokenType;
         }
         interface ParticipantsType {
            Primary?: stsService.wst13.ParticipantType;
            Participant?: Array<stsService.wst13.ParticipantType>;
         }
         interface ParticipantType {
            EndpointReference: stsService.wsa.EndpointReferenceType;
         }
      }
   }
}

export = vspherests;