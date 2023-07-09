import React, { useState } from 'react';
import Alert from '@/components/Alerta';

export const handleAlert = (mensaje, severidad) => {

    return (
        <div>
            <Alert mensaje={mensaje} severidad={severidad} />
        </div>
    );
};