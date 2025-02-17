import React from 'react';

// just steal this somehow
// https://turbo.build/blog
export default function ProjectsPage() {
  const projectData = [
    {
      'link': 'https://github.com/SCE-Development/Clark',
      'image': 'https://user-images.githubusercontent.com' +
        '/59713070/235862105-9606e862-e27e-40d4-8991-de1793c48dd0.png',
      'name': 'Clark', 'subnote': '(formerly Core-v4)',
      information: 'Full Stack',
      'caption': 'React, Express.js, and MongoDB; Clark is the club\'s website. It supports printing services for members and allows officers to control various devices in the clubroom.',
      iconDivClassName: 'size-1/5 space-x-4 w-4/12 lg:w-6/12 bottom-0',
      icons: (<>
        {/* react */}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z">
          </path>
          <path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z">
          </path>
          <path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z">
          </path>
          <circle cx="24" cy="24" r="4" fill="#80deea">
          </circle>
        </svg>
        {/* node */}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#388e3c" d="M17.204 19.122l-4.907 2.715C12.113 21.938 12 22.126 12 22.329v5.433c0 .203.113.39.297.492l4.908 2.717c.183.101.41.101.593 0l4.907-2.717C22.887 28.152 23 27.965 23 27.762v-5.433c0-.203-.113-.39-.297-.492l-4.906-2.715c-.092-.051-.195-.076-.297-.076-.103 0-.205.025-.297.076M42.451 24.013l-.818.452c-.031.017-.049.048-.049.082v.906c0 .034.019.065.049.082l.818.453c.031.017.068.017.099 0l.818-.453c.03-.017.049-.048.049-.082v-.906c0-.034-.019-.065-.05-.082l-.818-.452C42.534 24.004 42.517 24 42.5 24S42.466 24.004 42.451 24.013">
          </path>
          <path fill="#37474f" d="M35.751,13.364l-2.389-1.333c-0.075-0.042-0.167-0.041-0.241,0.003 c-0.074,0.044-0.12,0.123-0.12,0.209L33,20.295l-2.203-1.219C30.705,19.025,30.602,19,30.5,19c-0.102,0-0.205,0.025-0.297,0.076 h0.001l-4.907,2.715C25.113,21.892,25,22.08,25,22.282v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C35.887,28.106,36,27.918,36,27.715V13.788C36,13.612,35.904,13.45,35.751,13.364z M32.866,26.458l-2.23,1.235c-0.083,0.046-0.186,0.046-0.269,0l-2.231-1.235C28.051,26.412,28,26.326,28,26.234v-2.47 c0-0.092,0.051-0.177,0.135-0.224l2.231-1.234h-0.001c0.042-0.023,0.088-0.034,0.135-0.034c0.047,0,0.093,0.012,0.135,0.034 l2.23,1.234C32.949,23.587,33,23.673,33,23.765v2.47C33,26.326,32.949,26.412,32.866,26.458z">
          </path>
          <path fill="#2e7d32" d="M17.204,19.122L12,27.762c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0L23,22.329c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076">
          </path>
          <path fill="#4caf50" d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329l5.204,8.642 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762l-5.203-8.64c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076">
          </path>
          <path fill="#37474f" d="M47.703 21.791l-4.906-2.715C42.705 19.025 42.602 19 42.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C37.114 21.892 37 22.084 37 22.294v5.411c0 .209.114.402.297.503l4.908 2.717c.184.102.409.102.593 0l2.263-1.253c.207-.115.206-.412-.002-.526l-4.924-2.687C40.052 26.412 40 26.325 40 26.231v-2.466c0-.092.05-.177.13-.221l2.235-1.236h-.001c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237c.08.044.13.129.13.221v2.012c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393c.148-.086.24-.245.24-.417v-1.88C48 22.085 47.886 21.892 47.703 21.791zM10.703 21.791l-4.906-2.715C5.705 19.025 5.602 19 5.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C.114 21.892 0 22.084 0 22.294v7.465c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393C2.909 28.488 3 28.329 3 28.157v-4.393c0-.092.05-.177.13-.221l2.235-1.236H5.365c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237C7.95 23.588 8 23.673 8 23.765v4.393c0 .172.091.331.24.417l2.398 1.393c.075.043.167.043.242.001C10.954 29.925 11 29.845 11 29.759v-7.464C11 22.085 10.886 21.892 10.703 21.791z">
          </path>
        </svg>
        {/* tailwindcss */}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <linearGradient id="iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1" x1="21.861" x2="25.703" y1="8.237" y2="36.552" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#00c1e0">
            </stop>
            <stop offset="1" stop-color="#009bb8">
            </stop>
          </linearGradient>
          <path fill="url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)" d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z">

          </path>
        </svg>
        {/* mongodb */}
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
          <path fill="#5d4037" d="M42,17.3C42,37.8,24,44,24,44S6,37.8,6,17.3c0-2.5,0.2-4.6,0.4-6.3c0.3-2.5,2-4.5,4.4-5.1 C13.9,5,18.8,4,24,4s10.1,1,13.3,1.9c2.4,0.6,4.1,2.7,4.4,5.1C41.8,12.7,42,14.9,42,17.3z">
          </path>
          <path fill="#4caf50" d="M24,7c4.9,0,9.5,1,12.5,1.8c1.2,0.3,2,1.3,2.2,2.6c0.2,1.9,0.3,3.9,0.3,5.9c0,15.6-11.5,21.9-15,23.4 c-3.5-1.6-15-7.9-15-23.4c0-2,0.1-4,0.3-5.9c0.1-1.3,1-2.3,2.2-2.6C14.5,8,19.1,7,24,7 M24,4c-5.2,0-10.1,1-13.3,1.9 C8.4,6.5,6.6,8.6,6.4,11C6.2,12.7,6,14.9,6,17.3C6,37.8,24,44,24,44s18-6.2,18-26.7c0-2.5-0.2-4.6-0.4-6.3c-0.3-2.5-2-4.5-4.4-5.1 C34.1,5,29.2,4,24,4L24,4z">
          </path>
          <path fill="#dcedc8" d="M23 28H25V36H23z">
          </path>
          <path fill="#4caf50" d="M24,10c0,0-6,5-6,13c0,5.2,3.3,8.5,5,10l1-3l1,3c1.7-1.5,5-4.8,5-10C30,15,24,10,24,10z">
          </path>
          <path fill="#81c784" d="M24,10c0,0-6,5-6,13c0,5.2,3.3,8.5,5,10l1-3V10z">

          </path>
        </svg>
      </>)
    },
    {
      'link': 'https://github.com/SCE-Development/RFID-door-lock',
      'image': 'https://user-images.githubusercontent.com' +
        '/59713070/235862570-70f92c0a-8e18-4ddf-b7c8-bdb21723480f.jpeg',
      'name': 'RFID Door System',
      information: 'Firmware with Arduino',
      'caption': 'SCE\'s development team officers created an RFID card reader and door control relay to allow entry into the clubroom\'s office using a Clipper card.',
      iconDivClassName: 'size-1/5 space-x-4',
      icons: (
        <>
          {/* arduino */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#009688" d="M35.7,34.7c-7.7,0-13.2-8.9-13.4-9.3l-0.6-1l0.6-1C22.5,22.9,28,14,35.7,14C41.4,14,46,18.6,46,24.3 S41.4,34.7,35.7,34.7z M26.4,24.3c1.5,2,5.1,6.3,9.2,6.3c3.5,0,6.3-2.8,6.3-6.3c0-3.5-2.8-6.3-6.3-6.3C31.5,18,27.9,22.3,26.4,24.3 z">
            </path>
            <path fill="#009688" d="M12.3,34.7C6.6,34.7,2,30,2,24.3S6.6,14,12.3,14c7.9,0,13.2,8.9,13.4,9.3l0.6,1l-0.6,1 C25.5,25.7,20,34.7,12.3,34.7z M12.3,18C8.8,18,6,20.8,6,24.3c0,3.5,2.8,6.3,6.3,6.3c4.2,0,7.8-4.3,9.3-6.3 C20.2,22.3,16.6,18,12.3,18z">
            </path>
            <path fill="#009688" d="M10 23h6v2h-6V23zM32 23h6v2h-6V23z">
            </path>
            <path fill="#009688" d="M34,21h2v6h-2V21z">

            </path>
          </svg>
          {/* aws */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#dddddd" d="M13.527,21.529c0,0.597,0.064,1.08,0.176,1.435c0.128,0.355,0.287,0.742,0.511,1.161 c0.08,0.129,0.112,0.258,0.112,0.371c0,0.161-0.096,0.322-0.303,0.484l-1.006,0.677c-0.144,0.097-0.287,0.145-0.415,0.145 c-0.16,0-0.319-0.081-0.479-0.226c-0.224-0.242-0.415-0.5-0.575-0.758c-0.16-0.274-0.319-0.58-0.495-0.951 c-1.245,1.483-2.81,2.225-4.694,2.225c-1.341,0-2.411-0.387-3.193-1.161s-1.181-1.806-1.181-3.096c0-1.37,0.479-2.483,1.453-3.321 s2.267-1.258,3.911-1.258c0.543,0,1.102,0.048,1.692,0.129s1.197,0.21,1.836,0.355v-1.177c0-1.225-0.255-2.08-0.75-2.58 c-0.511-0.5-1.373-0.742-2.602-0.742c-0.559,0-1.133,0.064-1.724,0.21c-0.591,0.145-1.165,0.322-1.724,0.548 c-0.255,0.113-0.447,0.177-0.559,0.21c-0.112,0.032-0.192,0.048-0.255,0.048c-0.224,0-0.335-0.161-0.335-0.5v-0.79 c0-0.258,0.032-0.451,0.112-0.564c0.08-0.113,0.224-0.226,0.447-0.339c0.559-0.29,1.229-0.532,2.012-0.726 c0.782-0.21,1.612-0.306,2.49-0.306c1.9,0,3.289,0.435,4.183,1.306c0.878,0.871,1.325,2.193,1.325,3.966v5.224H13.527z M7.045,23.979c0.527,0,1.07-0.097,1.644-0.29c0.575-0.193,1.086-0.548,1.517-1.032c0.255-0.306,0.447-0.645,0.543-1.032 c0.096-0.387,0.16-0.855,0.16-1.403v-0.677c-0.463-0.113-0.958-0.21-1.469-0.274c-0.511-0.064-1.006-0.097-1.501-0.097 c-1.07,0-1.852,0.21-2.379,0.645s-0.782,1.048-0.782,1.854c0,0.758,0.192,1.322,0.591,1.709 C5.752,23.786,6.311,23.979,7.045,23.979z M19.865,25.721c-0.287,0-0.479-0.048-0.607-0.161c-0.128-0.097-0.239-0.322-0.335-0.629 l-3.752-12.463c-0.096-0.322-0.144-0.532-0.144-0.645c0-0.258,0.128-0.403,0.383-0.403h1.565c0.303,0,0.511,0.048,0.623,0.161 c0.128,0.097,0.223,0.322,0.319,0.629l2.682,10.674l2.49-10.674c0.08-0.322,0.176-0.532,0.303-0.629 c0.128-0.097,0.351-0.161,0.639-0.161h1.277c0.303,0,0.511,0.048,0.639,0.161c0.128,0.097,0.239,0.322,0.303,0.629l2.522,10.803 l2.762-10.803c0.096-0.322,0.208-0.532,0.319-0.629c0.128-0.097,0.335-0.161,0.623-0.161h1.485c0.255,0,0.399,0.129,0.399,0.403 c0,0.081-0.016,0.161-0.032,0.258s-0.048,0.226-0.112,0.403l-3.847,12.463c-0.096,0.322-0.208,0.532-0.335,0.629 s-0.335,0.161-0.607,0.161h-1.373c-0.303,0-0.511-0.048-0.639-0.161c-0.128-0.113-0.239-0.322-0.303-0.645l-2.474-10.4 L22.18,24.915c-0.08,0.322-0.176,0.532-0.303,0.645c-0.128,0.113-0.351,0.161-0.639,0.161H19.865z M40.379,26.156 c-0.83,0-1.66-0.097-2.458-0.29c-0.798-0.193-1.421-0.403-1.836-0.645c-0.255-0.145-0.431-0.306-0.495-0.451 c-0.064-0.145-0.096-0.306-0.096-0.451v-0.822c0-0.339,0.128-0.5,0.367-0.5c0.096,0,0.192,0.016,0.287,0.048 c0.096,0.032,0.239,0.097,0.399,0.161c0.543,0.242,1.133,0.435,1.756,0.564c0.639,0.129,1.261,0.193,1.9,0.193 c1.006,0,1.788-0.177,2.331-0.532c0.543-0.355,0.83-0.871,0.83-1.532c0-0.451-0.144-0.822-0.431-1.129 c-0.287-0.306-0.83-0.58-1.612-0.838l-2.315-0.726c-1.165-0.371-2.027-0.919-2.554-1.645c-0.527-0.709-0.798-1.499-0.798-2.338 c0-0.677,0.144-1.274,0.431-1.79s0.671-0.967,1.149-1.322c0.479-0.371,1.022-0.645,1.66-0.838C39.533,11.081,40.203,11,40.906,11 c0.351,0,0.718,0.016,1.07,0.064c0.367,0.048,0.702,0.113,1.038,0.177c0.319,0.081,0.623,0.161,0.91,0.258s0.511,0.193,0.671,0.29 c0.224,0.129,0.383,0.258,0.479,0.403c0.096,0.129,0.144,0.306,0.144,0.532v0.758c0,0.339-0.128,0.516-0.367,0.516 c-0.128,0-0.335-0.064-0.607-0.193c-0.91-0.419-1.932-0.629-3.065-0.629c-0.91,0-1.628,0.145-2.123,0.451 c-0.495,0.306-0.75,0.774-0.75,1.435c0,0.451,0.16,0.838,0.479,1.145c0.319,0.306,0.91,0.613,1.756,0.887l2.267,0.726 c1.149,0.371,1.98,0.887,2.474,1.548s0.734,1.419,0.734,2.257c0,0.693-0.144,1.322-0.415,1.87 c-0.287,0.548-0.671,1.032-1.165,1.419c-0.495,0.403-1.086,0.693-1.772,0.903C41.943,26.043,41.193,26.156,40.379,26.156z">
            </path>
            <path fill="#f90" d="M43.396,33.992c-5.252,3.918-12.883,5.998-19.445,5.998c-9.195,0-17.481-3.434-23.739-9.142 c-0.495-0.451-0.048-1.064,0.543-0.709c6.769,3.966,15.118,6.369,23.755,6.369c5.827,0,12.229-1.225,18.119-3.741 C43.508,32.364,44.258,33.347,43.396,33.992z M45.583,31.477c-0.671-0.871-4.438-0.419-6.146-0.21 c-0.511,0.064-0.591-0.387-0.128-0.726c3.001-2.128,7.934-1.516,8.509-0.806c0.575,0.726-0.16,5.708-2.969,8.094 c-0.431,0.371-0.846,0.177-0.655-0.306C44.833,35.927,46.254,32.331,45.583,31.477z">
            </path>
          </svg>
        </>
      ),
    },
    {
      'link': 'https://github.com/SCE-Development/',
      'image': 'https://user-images.githubusercontent.com' +
        '/59713070/235861717-5315d9df-fb5e-4414-84bb-0334fe769271.jpeg',
      'name': '3D Pancake Printer',
      information: '3D Printing with Marlin Firmware',
      'caption': 'In the spirit of our love for pancakes, SCE\'s hardware team constructed a 3D Pancake Printer. Does it work? No. When completed it will create intricate pancake designs.',
      iconDivClassName: 'size-3/5 space-x-4',
      icons: (
        <>
          {/* marlin firmware */}
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60">
            <path fill="#ffffff" d="M83.686 31.85v4.02h-2.703v-8.948h-2.998v11.696h8.7v-6.836c0-1.317.954-2.226 2.27-2.226 1.976 0 2.203 1.567 2.203 2.226v6.836h2.387c.3.007.61-.17.61-.808v-5.96c0-3.066-1.93-5.223-5.2-5.223-3.18 0-5.27 2.248-5.27 5.223zm-22.898 6.768H55.36v-5.814c0-1.794-1.34-3.27-2.998-3.27s-2.998 1.43-2.998 3.18c0 1.726 1.34 2.998 3.066 2.998h1.726v2.907h-2.1c-3.27 0-5.723-2.635-5.723-5.905 0-3.316 2.476-6.087 6.018-6.087 3.52 0 5.996 2.77 5.996 6.177v2.907h2.43v-3.86c0-2.975 2.1-5.223 5.27-5.223 3.27 0 5.2 2.157 5.2 5.223v.522H68.26v-.6c0-.66-.227-2.226-2.203-2.226-1.317 0-2.27.908-2.27 2.226v6.836h-2.998zM45.67 28.148c0-3.157-2.34-5.678-5.723-5.678-1.726 0-3.248.795-4.202 2.044a5.25 5.25 0 0 0-4.201-2.044c-3.36 0-5.7 2.52-5.7 5.678v9.936c0 .284.217.534.556.534h2.42V28.103c0-1.5 1.067-2.703 2.725-2.703 1.635 0 2.703 1.204 2.703 2.703v10.515h3.02V28.103c0-1.5 1.022-2.703 2.68-2.703 1.635 0 2.725 1.204 2.725 2.703v10.515h2.998v-10.47zm26.283 5.564c0 3.202 1.817 5.246 5.246 4.883V35.87c-1.476.09-2.226-.5-2.226-2.158V21.72h-3.02zm9.03-8.062v-1.68c0-.84-.68-1.5-1.5-1.5-.84 0-1.522.66-1.522 1.5v1.68z" />
            <path d="M26.783 17.557h66.433a5.62 5.62 0 0 1 5.599 5.599v13.69a5.62 5.62 0 0 1-5.599 5.599H26.783a5.62 5.62 0 0 1-5.599-5.599v-13.69a5.62 5.62 0 0 1 5.599-5.6z" strokeMiterlimit="22.92560005" fill="none" stroke="#000" strokeWidth="1.4" />
            <path d="M84.47 16.854l15.04 15.26v-15.26z" />
          </svg>
        </>
      ),
    },
    {
      'link': 'https://github.com/SCE-Development/rpi-led-controller',
      'image': 'https://user-images.githubusercontent.com' +
        '/59713070/235859723-cdea1a8e-5698-40c2-9755-9ec2e40984cd.jpeg',
      'name': 'SCE Light-Emitting Display',
      information: 'Interfacing RESTful APIs with Hardware',
      'caption': 'Produced as a part of our summer internship projects, SCE interns designed an officer-controlled illuminated sign, functioning to brighten the clubroom\'s atmosphere.',
      iconDivClassName: 'size-1/5 space-x-4',
      icons: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#050505" d="M16.458,2.987c-0.212,0.007-0.441,0.086-0.701,0.29c-0.635-0.245-1.251-0.33-1.802,0.168c-0.852-0.109-1.128,0.118-1.337,0.383c-0.187-0.002-1.397-0.191-1.953,0.638C9.27,4.3,8.829,5.287,9.329,6.205c-0.285,0.441-0.58,0.877,0.086,1.719C9.179,8.394,9.325,8.9,9.88,9.516c-0.146,0.659,0.142,1.123,0.659,1.486c-0.097,0.9,0.826,1.424,1.102,1.61c0.106,0.526,0.326,1.021,1.38,1.295c0.174,0.784,0.808,0.917,1.421,1.083c-2.028,1.178-3.768,2.729-3.755,6.535l-0.297,0.529c-2.326,1.414-4.418,5.96-1.146,9.655c0.214,1.156,0.572,1.986,0.891,2.905c0.478,3.705,3.593,5.44,4.414,5.646c1.205,0.916,2.487,1.787,4.222,2.396c1.636,1.688,3.408,2.331,5.19,2.329c0.026,0,0.053,0.001,0.079,0c1.781,0.002,3.554-0.642,5.189-2.329c1.735-0.608,3.018-1.479,4.223-2.396c0.821-0.206,3.937-1.941,4.413-5.646c0.319-0.919,0.678-1.749,0.892-2.905c3.271-3.695,1.18-8.241-1.146-9.655l-0.297-0.53c0.012-3.805-1.729-5.356-3.756-6.534c0.613-0.166,1.247-0.3,1.421-1.084c1.055-0.272,1.275-0.769,1.381-1.295c0.276-0.186,1.198-0.709,1.103-1.611c0.517-0.361,0.805-0.826,0.657-1.484c0.557-0.615,0.702-1.124,0.466-1.592c0.667-0.842,0.371-1.277,0.087-1.719c0.499-0.918,0.059-1.905-1.337-1.739c-0.555-0.829-1.766-0.64-1.953-0.638c-0.209-0.265-0.486-0.492-1.337-0.383c-0.551-0.498-1.167-0.413-1.802-0.168c-0.756-0.596-1.256-0.119-1.826,0.062c-0.912-0.298-1.122,0.111-1.57,0.277c-0.997-0.211-1.299,0.247-1.777,0.731l-0.556-0.011c-1.503,0.886-2.249,2.69-2.514,3.616c-0.264-0.928-1.009-2.731-2.512-3.616l-0.556,0.011c-0.479-0.484-0.781-0.942-1.778-0.731c-0.448-0.166-0.657-0.575-1.571-0.277C17.208,3.22,16.863,2.975,16.458,2.987L16.458,2.987z">
            </path>
            <path fill="#64DD17" d="M13.466 6.885c3.987 2.055 6.305 3.718 7.575 5.134-.65 2.607-4.042 2.726-5.283 2.653.254-.119.467-.26.541-.479-.311-.221-1.415-.023-2.186-.456.296-.062.435-.12.573-.339-.727-.232-1.511-.433-1.973-.817.249.003.481.055.806-.17-.652-.351-1.348-.629-1.888-1.166.337-.009.701-.004.806-.129-.596-.37-1.1-.78-1.518-1.23.472.058.671.009.786-.075-.452-.461-1.023-.85-1.294-1.421.35.121.671.168.902-.011-.154-.345-.81-.55-1.189-1.357.369.036.761.081.839 0-.172-.697-.465-1.089-.753-1.496.79-.01 1.985.004 1.931-.063l-.488-.499c.771-.207 1.561.034 2.133.213.257-.203-.005-.459-.318-.721.655.087 1.247.238 1.782.445.286-.258-.186-.516-.413-.773 1.012.191 1.44.46 1.866.73.31-.295.018-.548-.19-.807.764.283 1.156.648 1.57 1.009.141-.19.357-.328.096-.784.542.312.95.68 1.252 1.092.335-.214.2-.506.201-.775.563.459.921.946 1.358 1.423.088-.064.165-.282.233-.626 1.344 1.303 3.242 4.586.488 5.889C19.367 9.343 16.568 7.938 13.466 6.885L13.466 6.885zM34.623 6.885c-3.986 2.055-6.305 3.718-7.574 5.134.65 2.607 4.043 2.726 5.283 2.653-.254-.119-.466-.26-.542-.479.312-.221 1.415-.023 2.186-.456-.296-.062-.434-.12-.573-.339.729-.232 1.514-.433 1.974-.817-.249.003-.481.055-.806-.17.652-.351 1.348-.629 1.889-1.166-.338-.009-.701-.004-.807-.129.598-.37 1.1-.78 1.518-1.23-.473.058-.671.009-.785-.075.451-.461 1.021-.85 1.293-1.421-.35.121-.67.168-.9-.011.152-.345.811-.55 1.188-1.357-.369.036-.76.081-.838 0 .172-.697.465-1.089.754-1.496-.789-.012-1.985.004-1.932-.063l.488-.499c-.771-.207-1.56.034-2.133.213-.258-.203.005-.459.318-.721-.654.087-1.248.237-1.782.445-.286-.258.186-.516.414-.774-1.013.191-1.44.461-1.867.731-.31-.295-.018-.548.19-.807-.763.283-1.156.648-1.57 1.008-.14-.189-.356-.327-.095-.783-.542.311-.951.68-1.252 1.092-.335-.215-.2-.506-.202-.775-.563.459-.92.946-1.358 1.423-.088-.064-.165-.282-.232-.626-1.345 1.303-3.243 4.586-.488 5.889C28.723 9.342 31.521 7.938 34.623 6.885L34.623 6.885z">
            </path>
            <g>
              <path fill="#FF4081" d="M28.873 33.426c.014 2.433-2.113 4.414-4.75 4.428-2.638.012-4.788-1.948-4.801-4.381 0-.016 0-.031 0-.047-.014-2.433 2.112-4.414 4.75-4.428 2.638-.012 4.787 1.948 4.801 4.382C28.873 33.395 28.873 33.411 28.873 33.426zM21.333 20.846c1.979 1.296 2.335 4.234.797 6.563-1.539 2.329-4.391 3.165-6.37 1.868l0 0c-1.979-1.297-2.335-4.235-.797-6.563C16.502 20.385 19.355 19.549 21.333 20.846L21.333 20.846zM26.676 20.61c-1.98 1.295-2.337 4.235-.798 6.563 1.539 2.33 4.391 3.166 6.369 1.869l0 0c1.979-1.297 2.337-4.234.798-6.564C31.506 20.15 28.654 19.314 26.676 20.61L26.676 20.61zM11.443 22.966c2.136-.573.721 8.838-1.017 8.066C8.514 29.493 7.898 24.988 11.443 22.966zM36.135 22.848c-2.138-.572-.722 8.839 1.016 8.066C39.064 29.375 39.68 24.871 36.135 22.848zM28.875 15.839c3.687-.624 6.756 1.567 6.632 5.565C35.385 22.938 27.516 16.065 28.875 15.839zM18.687 15.72c-3.687-.621-6.755 1.57-6.631 5.567C12.177 22.821 20.045 15.949 18.687 15.72zM23.983 14.789c-2.2-.058-4.313 1.634-4.318 2.613-.006 1.19 1.741 2.412 4.333 2.442 2.648.019 4.337-.977 4.347-2.205C28.354 16.246 25.937 14.767 23.983 14.789L23.983 14.789zM24.118 39.221c1.919-.084 4.493.619 4.499 1.549.031.905-2.336 2.947-4.626 2.907-2.373.103-4.699-1.943-4.668-2.651C19.287 39.984 22.212 39.174 24.118 39.221zM17.031 33.703c1.366 1.646 1.988 4.539.849 5.39-1.079.652-3.698.384-5.56-2.29-1.255-2.245-1.094-4.527-.212-5.199C13.426 30.801 15.463 31.884 17.031 33.703L17.031 33.703zM30.932 33.183c-1.479 1.731-2.301 4.888-1.223 5.905 1.03.791 3.799.681 5.842-2.156 1.484-1.906.988-5.087.141-5.934C34.431 30.026 32.623 31.271 30.932 33.183L30.932 33.183z">
              </path>
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z">
            </path>
            <path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z">

            </path>
          </svg>
        </>
      ),
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
        <div className="mx-10 text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Recent Projects</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">The SCE Development Team is open to all students, no prior experience is required.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 w-auto md:w-full">
          {projectData.map((project) => (
            <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-5 text-gray-500">
                {/*  */}
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z">
                    </path>
                  </svg>
                  {project.information}
                </span>
                {/* maybe put something down here later? */}
                {/* <span className="text-sm">14 days ago</span> */}
              </div>
              <img src={project.image} />
              <h2 className="mb-2 pt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{project.name}</a>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{project.caption}</p>
              <div className="flex grid-flow-col justify-between items-center">
                <div className={`hidden md:flex justify-between items-center h-10 ${project.iconDivClassName}`}>
                  {project.icons}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Link
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd">
                    </path>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
