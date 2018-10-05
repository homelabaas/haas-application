import * as vsphereintegrity from './vsphereintegrity'
import * as vspheresrm from './vspheresrm'
import * as vspherevsan from './vspherevsan'
import * as vspherecis from './vspherecis'
import * as vspherests from './vspherests'
import * as vspherevim from './vspherevim'

declare module vsphere {
   function cisService(hostname: string, options?: {definitions?: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vspherecis.cisService>;
   function srmService(hostname: string, options?: {definitions?: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vspheresrm.srmService>;
   function stsService(hostname: string, options?: {definitions?: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vspherests.stsService>;
   function vimService(hostname: string, options?: {definitions?: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vspherevim.vimService>;
   function integrityService(hostname: string, options: {definitions: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vsphereintegrity.integrityService>;
   function vsanhealthService(hostname: string, options: {definitions: Array<string>; debug?: boolean; endpoint?: string; key?: string; port?: number; prefixes?: boolean;proxy?: boolean;proxyHeader?: string;}): Promise<vspherevsan.vsanhealthService>;

}
export = vsphere