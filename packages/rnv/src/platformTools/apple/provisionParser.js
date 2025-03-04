/* eslint-disable import/no-cycle */
import { provision, cert } from 'ios-mobileprovision-finder';
import chalk from 'chalk';
import path from 'path';
import { getConfigProp } from '../../common';
import { logWarning } from '../../systemTools/logger';


export const parseProvisioningProfiles = async (c) => {
    // PROJECT
    const teamID = getConfigProp(c, c.platform, 'teamID');
    const id = getConfigProp(c, c.platform, 'id');
    const certificates = cert.read();
    try {
        const provisionProfiles = provision.read();
        const result = provision.select(provisionProfiles, {
            AppId: id,
            TeamIdentifier: teamID,
            Certificates: certificates.valid
        });
        return result;
    } catch (e) {
        logWarning(`You have no provisioning files available. Check your ${chalk.white(path.join(c.paths.home.dir, 'Library/MobileDevice/Provisioning Profiles'))} folder`);
    }

    return null;
};
